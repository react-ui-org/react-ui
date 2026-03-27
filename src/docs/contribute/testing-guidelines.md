# Testing

Tools used to test the application:

* **ESLint** (static code analysis of JS files)
* **Stylelint** (static code analysis of CSS files)
* **Markdownlint** (static code analysis of Markdown files)
* **Jest** (unit tests)
* **Playwright** (visual and functional component testing)

Generally, `npm test` and `npm run test:playwright-ct:all` should be run  within
their designated Docker containers before pushing changes to the repository.

## Tools

Except Playwright, you can run all tests with a single command:

```bash
npm run test
```

### Linters (ESLint, Markdownlint, Stylelint)

Run linters either all together:

```bash
npm run lint
```

or run linters individually:

```bash
npm run <eslint|markdownlint|stylelint>
```

### Jest

```bash
npm run test:jest
```

### Playwright

#### Configuration

Test parameters can be tweaked by creating and tweaking `.env` file.

#### Running Tests

Run tests:

```bash
npm run test:playwright-ct:<all|all-with-update>
```

You can also run specific tests by passing a path to the test files:

```bash
npm run test:playwright-ct:<all|all-with-update> -- -- <match_path>
```

You can also pass any [CLI command][playwright-cli] to the test runner:

```bash
npm run test:playwright-ct:<all|all-with-update> -- -- <cli_argument>
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

[playwright-cli]: https://playwright.dev/docs/test-cli#reference
