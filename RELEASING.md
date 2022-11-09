# Releasing

The release process is fully automated so you can release a new version just
by bumping version number in `package.json`. However, there are several chances
to adjust both version and changelog if you wish to do so for a reason.

In order for the automation to work properly, contributors must follow the
[contributing guidelines][gh-contributing].

## How It Works

1. Pull requests are automatically labelled by branch name. Labels are then used
   for:

   1. resolving next [semantic version number][semver]
      (BREAKING.FEATURE.PATCH),
   2. grouping changes in changelog.

2. Release draft with changelog is generated as pull requests are merged into
   the `master` branch. Invididual PR names are listed and grouped by type based
   on label(s) added to them previously.

See the source of `.github/workflows` for details.

## Release Process

1. **As you go:** make sure all contributions follow the contributing
   guidelines, especially the [Git workflow][gh-contributing-git] (correct
   PR names and branch names). Check out the release draft on
   [GitHub releases page][gh-releases] to see what the changelog looks like and
   what will be the next version number.

   **Don't edit manually until you are ready to publish the release.** Release
   draft is automatically overwritten everytime a change is merged to `master`.

2. **Manual:** once you are ready to publish a release:

   1. **Bump the version number** in `package.json` and `package-lock.json`.
      Make sure it matches the intended version number in the release draft.
      **Don't combine this step with any other changes,** they wouldn't be
      reflected in the changelog.

   2. Now is also your **chance to review and adjust (if necessary) the intended
      version and actual changelog before the release is published.**
      Automatic release drafting is skipped when a version change in
      `package.json` is  detected so this time your changes will not be
      overwritten. Save your changes in release draft with the _Save draft_
      button, **do not publish** yet!

   3. Get back to the repository, commit both files as
      `Bump version to <VERSION_NUMBER>` in `release/<VERSION_NUMBER>` branch,
      create a pull request, hold your breath, and—merge it.

3. **Automatic:** once the release pull request from step 2.3 is merged, the
   following actions are triggered automatically:

   1. GitHub release draft with name corresponding to the version number from
      step 2 is published.
   2. Git tag with the version number from step 2 is added to `master` branch.
   3. Package is built and published to npm package registry.
   4. Documentation is built and deployed to production.

**Note:** prefix version number with `v` everywhere except in `package.json` and
`package-lock.json`.

[semver]: https://semver.org
[gh-contributing]: https://github.com/react-ui-org/react-ui/blob/master/CONTRIBUTING.md
[gh-contributing-git]: https://github.com/react-ui-org/react-ui/blob/master/CONTRIBUTING.md#git-workflow
[gh-releases]: https://github.com/react-ui-org/react-ui/releases
