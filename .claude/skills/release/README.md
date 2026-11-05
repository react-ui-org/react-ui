# Release Skill

Run `/release` to prepare a new version of React UI. It chooses the version,
bumps it on a `release/vX.Y.Z` branch, runs the checks and gives you the expected
changelog.

You still update the GitHub release draft and merge the PR, because merging is
what publishes the release. The skill can then confirm the release went out.

See [SKILL.md](./SKILL.md) for the steps and
[Releasing](../../../src/docs/contribute/releasing.md) for the process itself.
