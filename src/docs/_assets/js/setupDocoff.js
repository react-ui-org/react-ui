// Tells Docoff the URL the docs are deployed at, so that URLs starting with a slash
// (preview CSS, sources of components) work in subdirectory deployments (e.g. PR previews) too.
// The URL is derived from the co-located react-ui bundle URL.
//
// Types imported by components are looked up in the bundled type declarations, so that Docoff
// does not have to try the files the imports can point to one by one. The declarations are
// copied to the docs only when the docs are deployed. Locally, Docoff downloads the imported
// files, so the types are always up to date.
(() => {
  const script = [...document.querySelectorAll('script[src]')]
    .find((s) => /react-ui(\.\w+)?\.js$/.test(s.src));

  if (script) {
    window.docoffConfig = {
      basePath: script.src.replace(/docs\/_assets\/generated\/.*$/, ''),
      reactProps: {
        resolveRelativeImports: '/docs/_assets/generated/react-ui.d.ts',
      },
    };
  }
})();
