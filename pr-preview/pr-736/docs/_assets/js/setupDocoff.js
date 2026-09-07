// Derives --docoff-preview-css from the co-located react-ui bundle URL so that
// subdirectory deployments (e.g. PR previews) resolve the correct CSS file.
// Remove once https://github.com/react-ui-org/docoff/issues/50 is fixed.
(() => {
  const script = [...document.querySelectorAll('script[src]')]
    .find((s) => /react-ui(\.\w+)?\.js$/.test(s.src));

  if (script) {
    document.body.style.setProperty('--docoff-preview-css', script.src.replace(/\.js$/, '.css'));
  }
})();
