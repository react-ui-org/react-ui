// Tells Docoff the URL the docs are deployed at, so that URLs starting with a slash
// (preview CSS, sources of components) work in subdirectory deployments (e.g. PR previews) too.
// The URL is derived from the co-located react-ui bundle URL.
(() => {
  const script = [...document.querySelectorAll('script[src]')]
    .find((s) => /react-ui(\.\w+)?\.js$/.test(s.src));

  if (script) {
    window.docoffConfig = {
      baseUrl: script.src.replace(/docs\/_assets\/generated\/.*$/, ''),
    };
  }
})();
