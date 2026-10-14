# 2. Build our own UI library

Status: Accepted (retrospective)

## Context

Before React, the team behind React UI worked at VisionApps, a digital agency.
For its client projects it built and used Bootstrap UI, a custom extension of
Bootstrap.

When the agency moved to React, it decided to build its own UI library in React
instead of adopting an existing one. That is where the name React UI comes from.

The agency closed in mid 2018. The library stayed, and its developers continued
working on it as individuals in cooperation with RACOM. React UI has been used in
only a few projects since then. RACOM is by far the largest of them and is the
main reason the library still exists.

RACOM's applications have two requirements that ready-made libraries did not
meet: full control over the components, and a library that is as lightweight as
possible.

## Decision

We develop and maintain our own UI library rather than building on a
third-party one.

## Consequences

- We decide the API, the design and what goes in. Nothing changes because an
  upstream project changed direction.
- We keep the library small. Size and dependencies are weighed on every change.
- We carry the full cost of maintenance, accessibility, browser support and
  documentation ourselves.
- The generic name is hard to search for and says little about the library.
  We have kept it.
