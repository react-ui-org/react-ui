# Code

* Modify files only within defined scope, do not make changes that affect
  unrelated parts of the codebase, e.g. do not change unrelated comments,
  imports, code or documentation.
* Keep changes minimal and focused.
* Follow the project formatting and style sources:
  [.editorconfig](../../.editorconfig) (general),
  [.markdownlint.jsonc](../../.markdownlint.jsonc) (Markdown),
  [.eslintrc](../../.eslintrc) / [.eslintrc-ts](../../.eslintrc-ts)
  (JavaScript/TypeScript), [stylelint.config.js](../../stylelint.config.js)
  (SCSS).
* Only fix linting/formatting issues in files you created or modified for the
  current task. Do not fix pre-existing issues outside that scope.
* Keep comments simple and use terminology and language matching repository
  standards.
* Revert unrelated changes. If they are worth keeping, ask the user whether to
  track them separately — either as a GitHub issue (propose a title and
  description first, and confirm before creating it) or, for small changes, on a
  separate branch without an issue.
* Do not use one character long variable names or shortened names unless it is a
  common abbreviation.
