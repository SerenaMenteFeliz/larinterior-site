// PostHog — analytics do funil de captura (mesmo projeto usado pelo
// metodocalice-site e pelo serena-app: "Serena Mente Feliz", Cloud US).
// Chave pública por design, hardcoded aqui por não ter build step.
//
// person_profiles: 'identified_only' — visitante anônimo não vira "person"
// completo até dar o e-mail (identify() no submit do formulário).
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

// ?preview=1 é usado pelo /painel do zuppas-life pra embutir a landing ao
// vivo (iframe) na visualização interna de funil — sem isso, cada abertura
// do popup contaria como pageview real e inflaria o próprio funil que o
// painel existe pra medir. Sem init, `posthog.capture` nunca é definido
// pelo snippet, e phTrack() abaixo já é no-op nesse caso.
var IS_PREVIEW = new URLSearchParams(window.location.search).get('preview') === '1';

if (!IS_PREVIEW) {
  posthog.init('phc_rdbuvECaz39QiEK4KQZxwxSGTbkEaHvFghbTDS8VXcSL', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    autocapture: false,
    capture_pageview: true,
    session_recording: { maskAllInputs: true }
  });
}

function phTrack(name, props) {
  if (window.posthog && typeof posthog.capture === 'function') {
    posthog.capture(name, props || {});
  }
}
