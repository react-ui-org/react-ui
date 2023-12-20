# Contributing

In the first place, thank you for your interest in contributing! 🙏

## Development

Working on the site requires:

* [Docker]
* [Docker Compose]

This allows running the documentation site which serves as a development platform.

### Configure Docker Compose

Review the default env variable values in the `docker-compose.yml` file.
The defaults should work for most systems, but can be changed if needed.
To change them, edit the `.env` file as needed.

### Use Docker Compose

#### Node shell

All npm commands such as `npm ci`, `npm test`, `npm run eslint` and others you
need to run them within the `node_shell` docker container.

To log into the container, run:

```bash
docker compose run --rm node_shell
```

#### Run the Dev Server

1. **Within `node_shell`:** Install dependencies:

    ```bash
    npm ci
    ```

2. **On host:** Run development server:

    ```bash
    docker compose up node_dev_server mkdocs_dev_server
    ```

#### Build the Project

1. **On host:** Make sure the dev server is not running:

    ```bash
    docker compose down
    ```

2. **Within `node_shell`:** Install dependencies:

    ```bash
    npm ci
    ```

3. **On host:** Build JS:

    ```bash
    docker compose run --rm node_build_site
    ```

4. **On host:** Build mkDocs:

    ```bash
    docker compose run --rm mkdocs_build_site
    ```

## Git Workflow

In order for the automation to work in the best possible way (we use GitHub
Actions), please follow these guidelines:

1. **One pull request per subject.** Don't combine unrelated changes in a single
   PR unless they are really subtle details such as fix of a typo.

2. **Only PRs into `master` branch are listed in changelog.** PRs into other
   branches are not picked up by release automation.

3. **Name your branches according to nature of change.** Choose one of:

    * `bc/*` for breaking changes
    * `feature/*` for features
    * `bugfix/*` for bugfixes
    * `refactoring/*` for refactoring of the library
    * `docs/*` or `documentation/*` for changes in docs
    * `maintenance/*` for maintenance (builds, dependencies, automation, etc.)
    * `release/*` for releases (administrators only)

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
       description** (the topmost comment in the PR) in order for the issue
       to be
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

To prevent [Invalid Hook Call Warning][react-invalid-hook] when React UI is
linked, add the following code to your app's Webpack config:

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

## General Guidelines

To keep React UI consistent and predictable the following guidelines should be observed:

1. If component accepts the `children` prop it should be either required or the element
   should return `null` when no children are provided.
2. When forwarding HTML attributes to the component the following rules should
    be observed:
    1. If the component internally instantiates one or more interactive
        (clickable/editable) elements, the attributes should be forwarded to
       all of them.
    2. If the component does not internally instantiate an interactive
        (clickable/editable) element, the attributes should be forwarded to the
        root element of the component.

## Documenting

We use combination of [Material for MkDocs][mkdocs-material] and [Docoff] as
the documentation platform.

Do see their respective documentation for details.

[Docker]: https://www.docker.com
[Docker Compose]: https://docs.docker.com/compose/
[react-invalid-hook]: https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
[mkdocs-material]: https://squidfunk.github.io/mkdocs-material/
[Docoff]: https://github.com/react-ui-org/docoff
