---
description: Draft a commit message and commit staged changes, following the project git conventions
allowed-tools: Bash(git status), Bash(git diff:*), Bash(git log:*), Bash(git blame:*), Bash(git merge-base:*), Bash(git rev-parse:*), Bash(git add:*), Bash(git commit:*)
---

# Commit

Draft a commit message and commit the staged changes, following the project's
git conventions.

## When to use

* You invoke this to commit staged work. User-only — never auto-invoked.

## Context

Status:

!`git status`

Staged diff:

!`git diff --staged`

Branch:

!`git rev-parse --abbrev-ref HEAD`

Branch commits since `master`:

!`git log master..HEAD --oneline 2>/dev/null | head -20`

## Steps

Each commit must be atomic and never leave the app broken.

If nothing is staged, stop and tell the user.

Before committing, check the following (see [Commands](../../../CLAUDE.md#commands)):

* `npm run build` passes
* `mkdocs build` passes
* `npm run lint` passes
* `npm run test:jest` passes
* `npm run test:playwright-ct:all` passes

Write a commit message for the staged changes following the project's git
conventions ([General Guidelines › Git Workflow](../../../src/docs/contribute/general-guidelines.md#git-workflow)):

Do not append `Co-Authored-By`.

## Reference

* [General Guidelines › Git Workflow](../../../src/docs/contribute/general-guidelines.md#git-workflow)
