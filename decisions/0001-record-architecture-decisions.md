# 1. Record architecture decisions

Status: Accepted

## Context

React UI has been developed since 2018. Most decisions about its architecture
were made on calls, in issues or in pull requests, and were never written down.
The reasons behind them are known only to the people who were there.

This is becoming a problem. New contributors, including AI agents, cannot tell a
deliberate decision from an accident, and they suggest changes that were
rejected long ago. With 1.0 approaching, API changes need to be explained once
and kept in one place.

## Decision

We record significant architecture decisions as short Markdown files in
`/decisions`, numbered in order. Each one describes the context, the decision
and its consequences.

The records are not part of the public documentation. They are meant for
maintainers and contributors.

We also record a few earlier decisions that still shape the library, so the log
does not start in the middle of the project's history.

## Consequences

- A decision is written down when it is made, not reconstructed later.
- A record is never edited to change its meaning. A new record supersedes it.
- Retrospective records describe decisions as we remember them and link to the
  original discussion where one exists.
