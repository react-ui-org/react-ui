// Checks licenses of all dependencies, including transitive ones, against an allowlist.
//
// The whole dependency tree is checked, not just runtime dependencies, because dev
// dependencies can be bundled into the distribution too (e.g. `core-js` polyfills).
//
// Usage: node scripts/check-licenses.js [<project root>]

const fs = require('fs');
const path = require('path');

// Permissive licenses allowed anywhere in the dependency tree. Make sure a license
// is not copyleft before adding it here.
const ALLOWED_LICENSES = [
  '0BSD',
  'Apache-2.0',
  'BlueOak-1.0.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'CC-BY-4.0',
  'CC0-1.0',
  'ISC',
  'MIT',
  'MIT-0',
  'PSF-2.0',
  'Python-2.0',
];

// Packages allowed despite their license, mapped to the license they are allowed
// with. An exception only applies while the package is a dev dependency, so it is
// never installed by consumers. Do not add packages that get bundled into `dist`.
const EXCEPTIONS = {
  // Used by `eslint-plugin-jsx-a11y` for linting only
  'axe-core': 'MPL-2.0',
};

// Evaluates SPDX license expression, e.g. `(MIT OR CC0-1.0)`. `OR` requires one of
// the licenses to be allowed, `AND` requires all of them. Anything else, including
// `WITH` and malformed expressions, is not allowed.
const isLicenseExpressionAllowed = (expression) => {
  const tokens = expression
    .replace(/[()]/g, ' $& ')
    .trim()
    .split(/\s+/);
  let position = 0;
  let isValid = true;

  const isOperator = (operator) => tokens[position]?.toUpperCase() === operator;

  // Function declarations are hoisted, so `parseLicense` can call `parseOr` declared below
  // to parse parenthesized expressions
  function parseLicense() {
    const token = tokens[position];
    position += 1;

    if (token !== '(') {
      return ALLOWED_LICENSES.includes(token);
    }

    const isAllowed = parseOr();
    if (tokens[position] !== ')') {
      isValid = false;
    }
    position += 1;

    return isAllowed;
  }

  function parseAnd() {
    let isAllowed = parseLicense();
    while (isOperator('AND')) {
      position += 1;
      isAllowed = parseLicense() && isAllowed;
    }

    return isAllowed;
  }

  function parseOr() {
    let isAllowed = parseAnd();
    while (isOperator('OR')) {
      position += 1;
      isAllowed = parseAnd() || isAllowed;
    }

    return isAllowed;
  }

  const isAllowed = parseOr();

  return isValid && position === tokens.length && isAllowed;
};

// Some packages have no license in `package-lock.json`, so it is read from their
// installed `package.json`. Returns `null` when the license cannot be determined.
const readInstalledLicense = (projectRoot, packagePath, version) => {
  const manifestPath = path.join(projectRoot, packagePath, 'package.json');
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.version !== version) {
    return null;
  }

  if (typeof manifest.license === 'string') {
    return manifest.license;
  }

  // Legacy formats: `{ "type": "MIT" }` and `"licenses": [{ "type": "MIT" }]`
  if (manifest.license?.type) {
    return manifest.license.type;
  }
  if (Array.isArray(manifest.licenses) && manifest.licenses.length > 0) {
    return manifest.licenses
      .map((license) => license.type ?? license)
      .join(' OR ');
  }

  return null;
};

const projectRoot = process.argv[2] ?? path.join(__dirname, '..');
const { packages } = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package-lock.json'), 'utf8'));

const problems = [];
const usedExceptions = new Set();
let checkedPackagesCount = 0;

Object.entries(packages).forEach(([packagePath, entry]) => {
  // Skip the project itself and linked local packages
  if (packagePath === '' || entry.link) {
    return;
  }

  checkedPackagesCount += 1;

  // Aliased packages (e.g. `@typescript/native`) have their real name in `name`
  const name = entry.name ?? packagePath.split('node_modules/').pop();
  const license = entry.license ?? readInstalledLicense(projectRoot, packagePath, entry.version);
  const packageLabel = `${packagePath} (${name}@${entry.version})`;

  if (license && isLicenseExpressionAllowed(license)) {
    return;
  }

  if (license && EXCEPTIONS[name] === license) {
    usedExceptions.add(name);
    if (!entry.dev) {
      problems.push(`${packageLabel}: ${license} is excepted for dev dependencies only`);
    }

    return;
  }

  problems.push(`${packageLabel}: ${license ? `${license} is not allowed` : 'unknown license'}`);
});

Object.keys(EXCEPTIONS)
  .filter((name) => !usedExceptions.has(name))
  .forEach((name) => {
    console.warn(`Exception for ${name} is not used anymore, remove it from scripts/check-licenses.js.`);
  });

if (problems.length > 0) {
  console.error(`Found ${problems.length} package(s) with not allowed or unknown license:\n`);
  problems.forEach((problem) => {
    console.error(`  ${problem}`);
  });
  console.error([
    '',
    'Run `npm explain <package>` to see why a package is installed.',
    'Unknown license can also mean that `node_modules` is out of date, run `npm ci` then.',
    'Allowed licenses and exceptions are defined in scripts/check-licenses.js.',
  ].join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Licenses of all ${checkedPackagesCount} packages are allowed.`);
}
