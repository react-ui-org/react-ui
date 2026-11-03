---
description: Prepare a React UI release by choosing the version, bumping it on a release branch, running checks and preparing the changelog. Use whenever the user asks to prepare, cut or start a release, or to bump the version for one. Stops before merging, because merging publishes.
---

# Release

Follows [Releasing](../../../src/docs/contribute/releasing.md). Merging the
release PR publishes the GitHub release and npm package and deploys the docs,
so never merge it. Commit, push or open the PR only when the user asks.

## 1. Choose the version

1. Start from an up-to-date `master` with no unrelated staged changes.
2. List merged PRs into `master` since the last tag, with their labels. Use the
   GitHub MCP tools, as `gh` may not be installed.
3. Pick the version. While on `0.x`:

   | Merged PR labels       | Bump  | Example            |
   |------------------------|-------|--------------------|
   | `BC` or `feature`      | minor | `0.63.1` → `0.64.0` |
   | Anything else          | patch | `0.64.0` → `0.64.1` |

## 2. Bump

1. Create the `release/vX.Y.Z` branch.
2. Change the version in `package.json` and in both root entries of
   `package-lock.json`. Change nothing else, as other changes would be missing
   from the changelog.

## 3. Check

Run the checks listed in [`/commit`](../commit/SKILL.md) and read each command's
own exit code.

If `npm run test:playwright-ct:all` stops with `EBADDEVENGINES`, no tests ran.
This is a known problem ([#782](https://github.com/react-ui-org/react-ui/issues/782)).
Until it's fixed, run them directly and tell the user that the documented command
failed. Remove this fallback when #782 is closed.

```sh
sudo docker compose -p "$COMPOSE_PROJECT_NAME" exec -T playwright sh -c \
  'PATH="/workspace/node_modules/.bin:$PATH" playwright test -c playwright-ct.config.ts --update-snapshots=none'
```

## 4. Hand over the draft

Stage the bump, then ask the user to check the draft on the
[releases page](https://github.com/react-ui-org/react-ui/releases). The API
token may not be able to see drafts, so a missing draft proves nothing.

* The draft's tag and title must be `vX.Y.Z`. On `BC` changes, release-drafter
  proposes the next major (`v1.0.0`). If no draft matches when the PR merges,
  the workflow publishes an empty release with no changelog.
* The user saves the draft without publishing it.

Give the user the expected changelog, grouped as in
[release-drafter.yml](../../../.github/release-drafter.yml):

```markdown
## ⚠️ Breaking Changes

- <PR title> by @<author> (PR #<number>)
```

Leave out PRs labelled `skip changelog`, and list anything worrying, such as
vulnerabilities GitHub reports on push.

## 5. Commit and open the PR

When the user asks:

1. Commit with `/commit`, using the message ``Bump version to `vX.Y.Z` ``.
2. Push the branch.
3. Open a PR into `master` with the same title and no AI attribution. Say that
   merging it publishes the release.

## 6. Confirm the release

If asked to watch the release after the merge, poll in the background. Run one
poll in the foreground first and check its output, because a poll that swallows
errors never reports anything. Don't assume `jq` is installed.

The release is out when all of these are true:

* The `release-management.yml` run for the bump commit has finished successfully,
  including its npm and docs jobs.
* The GitHub release `vX.Y.Z` is not a draft and has the changelog.
* The npm registry lists the version as `latest` for `@react-ui-org/react-ui`.

Report any failed job as soon as you see it, and don't retry the publish.
