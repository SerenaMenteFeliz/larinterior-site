// A/B split middleware — roda no edge da Vercel antes de servir qualquer arquivo.
//
// Como usar:
//   1. Crie a variante B em `desafio-7-dias/v2.html`
//   2. Adicione 'v2' ao array VARIANTS abaixo (e ajuste os pesos em WEIGHTS)
//   3. O middleware atribui a variante uma vez por visitante (cookie AB_desafio-7-dias)
//   4. Rastreie no PostHog: envie o evento `ab_assigned` com a propriedade `variant`
//
// Para desativar o teste: deixe VARIANTS com só ['v1'] — todos veem index.html.

import { NextResponse } from 'next/server'

const ROUTES = {
  '/desafio-7-dias': {
    variants: ['v1'],   // adicionar 'v2', 'v3'... quando existirem
    weights:  [1],      // pesos relativos (ex: [1, 1] = 50/50 | [3, 1] = 75/25)
    cookie:   'AB_desafio-7-dias',
  },
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const route = ROUTES[pathname]
  if (!route) return NextResponse.next()

  const { variants, weights, cookie: cookieName } = route

  // Só um variante → sem split, passa direto
  if (variants.length === 1) return NextResponse.next()

  // Ler atribuição existente
  let variant = request.cookies.get(cookieName)?.value
  if (!variant || !variants.includes(variant)) {
    variant = pickVariant(variants, weights)
  }

  // Reescrever internamente (URL do usuário não muda)
  const file = variant === 'v1' ? 'index.html' : `${variant}.html`
  const rewritten = new URL(`${pathname}/${file}`, request.url)
  const response = NextResponse.rewrite(rewritten)

  // Persistir atribuição por 30 dias
  response.cookies.set(cookieName, variant, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: ['/desafio-7-dias'],
}

function pickVariant(variants, weights) {
  const total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (let i = 0; i < variants.length; i++) {
    r -= weights[i]
    if (r <= 0) return variants[i]
  }
  return variants[variants.length - 1]
}
