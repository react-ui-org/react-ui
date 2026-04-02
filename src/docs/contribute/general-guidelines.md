# Contributing

In the first place, thank you for your interest in contributing! 🙏

## Development Environment

### Overview

All development is done inside the container named `devcontainer` which
contains all necessary tools and dependencies. All commands in the documentation
are container-agnostic and are meant to be run directly inside the `devcontainer`.

The `devcontainer` orchestrates other service containers behind the scenes via
Docker-from-Docker. Other containers are implementation details and should not
be accessed directly.

There are two supported ways to access the development environment. Recommended
way is to use [Development Containers] with an IDE, which provides a more
seamless experience. The alternative is to use Docker Compose directly.

### Requirements

* [Docker]
* [Docker Compose]
* [Development Containers] (strongly recommended)

### Setup

#### Automatic setup

Run the setup script to automatically create and configure all necessary files
and build Docker images:

```bash
bash setup.sh
```

[Development Containers] run this script automatically if the project has not
been set up prior to opening it.

#### Manual setup

If you prefer to set up the project manually:

1. Create `.env` file and configure it:

    ```bash
    cp .env.dist .env
    ```

2. Create `docker-compose.yml` and configure it:

    ```bash
    cp docker-compose.yml.dist docker-compose.yml
    ```

3. Build Docker images:

    ```bash
    bash docker/build-docker-images.sh
    ```

#### Environment

The `.env` file configures services (ports, UID/GID, source mapping),
the `devcontainer` shell, editor and SSH agent forwarding, as well as application
settings. See `.env.dist` for available options.

### Accessing the Development Environment

#### Using Development Containers

Open the project in an IDE that supports [Development Containers] (e.g.
[Visual Studio Code][vscode-devcontainers], [JetBrains IDEs][jetbrains-devcontainers]).
The IDE will automatically set up the environment using the configuration in
`.devcontainer/devcontainer.json`.

#### Using Docker Compose

1. Start the `devcontainer` in the background:

    ```bash
    docker compose up -d
    ```

2. Open a shell inside the `devcontainer`:

    ```bash
    docker compose exec devcontainer bash
    ```

3. To stop the environment:

    ```bash
    docker compose down
    ```

### Customization

To customize the `devcontainer`, create a
`docker/react_ui_devcontainer_local/Dockerfile` that extends the base image:

```Dockerfile
# Image name `react-ui_devcontainer` might differ based on Docker compose project name
FROM react-ui_devcontainer as react-ui_devcontainer_local
# Add your customizations here
```

Then ensure `docker-compose.yml` has the `build` directive for the `devcontainer`
service:

```yml
devcontainer:
  extends:
    file: docker-compose.base.yml
    service: devcontainer
  build:
    context: ./docker/react_ui_devcontainer_local/
    dockerfile: Dockerfile
```

Rebuild the images after making changes:

```bash
bash docker/build-docker-images.sh
```

If you need to persist additional data across container restarts, see how it is
done in `docker-compose.base.yml`. You will need to add a volume mapping to the
`devcontainer` service and add a corresponding named volume definition.

### What the `devcontainer` Contains

The `devcontainer` is built in the following layers:

#### Base Layer (`react-ui_devcontainer`)

General-purpose development layer. Makes the environment container-agnostic
by wrapping commands to run in the appropriate service containers.

* **OS:** Debian Bookworm
* **Shells:** Bash, Zsh (with Oh My Zsh), Fish
* **Editors:** Vim, Nano
* **Tools:** Git, SSH client, Docker CLI (Docker-from-Docker)
* **AI coding assistants:** Claude Code, GitHub Copilot CLI, Open Code

#### Local Layer (`react-ui_devcontainer_local`)

Optional layer that allows individual developers to customize the environment.
See [Customization](#customization) for details.

### Service Containers

The `devcontainer` depends on the following service containers defined in
`docker-compose.base.yml`:

| Container    | Purpose                                          |
|--------------|--------------------------------------------------|
| `node`       | Runs Node.js commands (`npm`, `node`)            |
| `playwright` | Runs Playwright and Lighthouse tests             |
| `docs`       | Serves documentation via MkDocs                  |

All service containers mount the workspace at `/workspace` so that file changes
are shared.

## Installing Dependencies

Run it on initial setup or when dependencies have changed:

```bash
npm ci
```

## Building

To build the JavaScript code:

```bash
npm run build
```

To build the documentation:

```bash
mkdocs build
```

## Running

> See `.env` whether both the application and documentation server are not configured
> to auto-start on container startup. If they are, you can skip the following steps.

To start building JavaScript files in watch mode:

```bash
npm start
```

To start the documentation server:

```bash
mkdocs serve
```

## Testing

Please check out our [Testing Guidelines](./testing-guidelines.md).
It includes testing guidelines and information on how to run tests.

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

1. In React UI repository **on your host machine**, run `npm link`
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

[Development Containers]: https://containers.dev/
[Docker]: https://docs.docker.com/get-started/
[Docker Compose]: https://docs.docker.com/compose/
[jetbrains-devcontainers]: https://www.jetbrains.com/help/idea/start-dev-container-inside-ide.html#dev_container_context_menu
[vscode-devcontainers]: https://code.visualstudio.com/docs/devcontainers/tutorial
[react-invalid-hook]: https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
[mkdocs-material]: https://squidfunk.github.io/mkdocs-material/
[Docoff]: https://github.com/react-ui-org/docoff
