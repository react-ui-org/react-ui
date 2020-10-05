---
name: Releasing
route: /contribute/releasing
menu: Contribute
---

# Releasing

The release process is fully automated. The only condition is that contributors
must follow the [contributing guidelines](/contribute/guidelines).

How it works:

- Pull requests are automatically labelled based on branch name. The labels are
  used for:

  - resolving next [semantic version number](https://semver.org)
    (BREAKING.FEATURE.PATCH)
  - grouping changes in changelog

- Release changelog is generated as pull requests are merged into the `master`
  branch. Invididual PR names are listed and grouped by type based on the label
  added to them previously.

See the source of `.github/workflows` for details.

## Release Process

1. **As you go:** make sure all contributions follow the contributing
   guidelines, especially the
   [Git workflow](/contribute/guidelines#git-workflow) (correct PR names and
   branch names). Check out the release draft on
   [GitHub releases page](https://github.com/react-ui-org/react-ui/releases) to
   see what the changelog looks like and what will be the next version number.

2. **Manual:** once you are ready to publish a release, bump the version number
   in `package.json` and `package-lock.json`. Make sure it matches the resolved
   version number in the release draft. Commit as `Bump version` in
   `release/<VERSION_NUMBER>` branch, create a pull request and merge it.

3. **Automatic:** once the release pull request from step 2 is merged, the
   following actions are triggered automatically:

   1. GitHub release draft with name corresponding to the version number from
      step 2 is published.
   2. Git tag with the version number from step 2 is added to `master` branch.
   3. Package is built and published to npm package registry.
   4. Documentation is built and deployed to production.
