# The Playwright image is pinned by digest, Microsoft rebuilds its tags in place
# (`v1.64.1` moved from Node.js 24 to Node.js 26 on 2026-11-01). This digest
# contains Node.js 26.13.0 and npm 11.20.0, matching the `node` service.
FROM        mcr.microsoft.com/playwright:v1.64.1-noble@sha256:2f05f8a734509a7b3f26a912639488ee08f58a7b292d14d62271bcff9038768f
RUN         mkdir /workspace
WORKDIR     /workspace
