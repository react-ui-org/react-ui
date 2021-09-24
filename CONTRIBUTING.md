---
name: General Guidelines
route: /contribute/guidelines
menu: Contribute
---

# Contributing

In the first place, thank you for your interest in contributing! 🙏

## Development

To build the project:

1. Install local npm packages: `npm install`
2. Run the build: `npm run build`

To run the dev server:

1. Install local npm packages: `npm install`
2. Run the dev server (usually on `http://localhost:3000`): `npm start`

## Git Workflow

In order for the automation to work in the best possible way (we use GitHub
Actions), please follow these guidelines:

1. **One pull request per subject.** Don't combine unrelated changes in a single
   PR unless they are really subtle details such as fix of a typo.

2. **Only PRs into `master` branch are listed in changelog.** PRs into other
   branches are not picked up by release automation.

3. **Name your branches according to nature of change.** Choose one of:

   - `bc/*` for breaking changes
   - `feature/*` for features
   - `bugfix/*` for bugfixes
   - `refactoring/*` for refactoring of the library
   - `docs/*` or `documentation/*` for changes in docs
   - `maintenance/*` for maintenance (builds, dependencies, automation, etc.)
   - `release/*` for [releases](/contribute/releasing) (administrators only)

4. **Write clear, helpful and descriptive commit messages.**

   1. **Use imperative and write in English,** e.g. _Update dependencies_ or
      _Claim support for controlled components only_.
   2. **If an issue exists for your changes, append the issue number** in
      parentheses to the end of the commit message, e.g. _Update dependencies
      (#261)_.
   3. Optionally use Markdown code blocks to emphasize, e.g.
      _Create `ScrollView` component (#53)_.

5. **Write clear, helpful and descriptive PR names.**

   1. **All rules for commit messages apply** also for PR names.
   2. **Always check that PR name meets the requirements** above because **PR
      names are used in changelog**. GitHub automatically truncates long PR
      names and picks up branch name for multi-commit PRs, so it's necessary to
      make sure the PR name is what we want to have in the changelog.
   3. **If an issue exists for your changes, append this text to PR
      description** (the topmost comment in the PR) in order for the issue to be
      closed automatically once the PR is merged: `Closes #<ISSUE NUMBER>`. You
      will know the issue is linked correctly when it appears in the _Linked
      issues_ section of the PR. (Having the issue mentioned in commit message
      and/or PR name does _not_ have this effect.)
   4. **If there is no issue for your changes, please add your PR to `The
      Board`** GitHub project in the _Projects_ section of the PR. The correct
      board column will be selected automatically. This helps us keep track of
      what is in development.

Pull requests are labelled automatically. You can add more labels to better
qualify the nature of the change — in such case, it will be included in all
corresponding changelog groups. Or use the `skip changelog` label to exclude a
pull request from the changelog.

## Package Linking

The best way for development of React UI is to link `react-ui` into your
application with `npm link` so you can see it in action.

1. In React UI repository, run `npm link`
2. In your application, run `npm link @react-ui-org/react-ui`

To prevent
[Invalid Hook Call Warning](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react)
when React UI is linked, add the following code to your app's Webpack config:

```js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
};
```

## Documenting

We use [Docz](https://docz.site) (powered by [Gatsby](https://www.gatsbyjs.com))
as the documentation platform. The documentation itself is written in
[MDX](https://mdxjs.com) format — a human-readable blend of the popular Markdown
and JSX syntax.

Run `npm start` to run the docs in development mode, and open
`http://localhost:3000` in your browser to see the docs in live-reload mode.

A few things to note:

- In order to get component props parsed and rendered by Docz, it's crucial to
  **import the component into an MDX file right from its source file** — parsing
  a re-exported component (typically via `index.js`) isn't currently supported.

- If you don't want Gatsby to collect **anonymous statistics**, you may want to
  disable [Gatsby telemetry](https://www.gatsbyjs.com/docs/telemetry/) by
  running `npx gatsby telemetry --disable`.

- If you see the Not found page after having **changed the configuration of Docz
  or Gatsby in the live-reload mode,** you may either restart the Docz
  development server (`ctrl + c` and `npm start`), or try to edit an MDX file
  which makes the Docz rebuild, too.

- To **make your authoring experience better,** we recommend to make sure your
  IDE understands the MDX syntax and is able to help you wrap lines in MD and
  MDX files automatically (Jetbrains IDE's and VSCode support both features
  out-of-the-box or through a plugin).
