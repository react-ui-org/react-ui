# Testing

Tools used to test the application:

* **ESLint** (static code analysis of JS files)
* **Markdownlint** (static analysis of MD files)
* **Stylelint** (static code analysis of CSS files)
* **Jest** (unit testing)
* **Playwright** (visual and functional component testing)

Generally, `npm test` and `npm run test:playwright-ct:all` should be run  within
their designated Docker containers before pushing changes to the repository.

## Tools

### Linters (ESlint, Markdownlint, Stylelint)

They can be run individually:

1. (optional) [Open][gh-gg-node-shell] `node_shell` Docker
   container
2. Run linters:

    ```bash
    npm run <eslint|markdownlint|stylelint>
    ```

or all together:

1. (optional) [Open][gh-gg-node-shell] `node_shell` Docker
   container
2. Run linters:

    ```bash
    npm run lint
    ```

### Jest

Jest tests can be run using the following commands:

1. (optional) [Open][gh-gg-node-shell] `node_shell` Docker
   container
2. Run tests:

     ```bash
     npm run test:jest
     ```

or all together with linters:

1. (optional) [Open](/README.md#node_shell-docker-container) `node_shell` Docker
   container
2. Run tests:

    ```bash
    npm test
    ```

### Playwright

Playwright tests must be run in a Docker container to ensure a uniform
environment. Otherwise, snapshots would differ between operating systems.

This is the reason why you need to run Playwright tests separately
from other tools.

#### Configuration

Test parameters can be tweaked by creating and tweaking `.env.playwright` file:

```bash
cp .env.playwright.dist .env.playwright
```

#### Running Tests

Playwright tests can be run using the following commands:

1. [Open][gh-gg-playwright] `playwright` Docker container
2. Run tests:

    ```bash
    npm run test:playwright-ct:<all|all-with-update>
    ```

You can also run specific tests by passing a path to the test files:

```bash
npm run test:playwright-ct:<all|all-with-update> -- <match_path>
```

You can also pass any [CLI command][playwright-cli] to the test runner:

```bash
npm run test:playwright-ct:<all|all-with-update> -- <cli_argument>
```

#### Opening Test Report

After running Playwright tests, test report can be served into a browser
by using the following command:

```bash
npx playwright show-report
```

[gh-gg-node-shell]: /docs/contribute/general-guidelines#node-shell
[gh-gg-playwright]: /docs/contribute/general-guidelines#playwright
[playwright-cli]: https://playwright.dev/docs/test-cli#reference
