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

**On host:**

[Open][gh-gg-node-shell] `node_shell` Docker container:

```bash
docker compose run --rm node_shell
```

**Within `node_shell`:**

Run linters either all together:

```bash
npm run lint
```

or run linters individually:

```bash
npm run <eslint|markdownlint|stylelint>
```

### Jest

**On host:**

[Open][gh-gg-node-shell] `node_shell` Docker container:

```bash
docker compose run --rm node_shell
```

**Within `node_shell`:**

Run Jest tests:

```bash
npm run test:jest
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

**On host:**

[Open][gh-gg-playwright] `playwright` Docker container:

```bash
docker compose run --rm --service-ports playwright
```

**Within `playwright`:**

Run tests:

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

After running Playwright tests, test report can be served by using
the following command:

```bash
npm run test:playwright-ct:show-report
```

Then open the displayed URL (typically `http://localhost:9323`)
in your browser. Please note that the test report is only available
if the tests were run prior to serving the report.

[gh-gg-node-shell]: /docs/contribute/general-guidelines#node-shell
[gh-gg-playwright]: /docs/contribute/general-guidelines#playwright
[playwright-cli]: https://playwright.dev/docs/test-cli#reference
