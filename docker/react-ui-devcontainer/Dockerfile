FROM frontend-devcontainer

# Wrapper scripts that execute commands inside the appropriate Docker containers.
# These scripts use Docker-from-Docker to run the commands in the context of the
# respective Docker containers, allowing container agnostic development workflows.

COPY --chmod=+x files/usr/local/bin/node /usr/local/bin/node
COPY --chmod=+x files/usr/local/bin/npm /usr/local/bin/npm
COPY --chmod=+x files/usr/local/bin/npx /usr/local/bin/npx
COPY --chmod=+x files/usr/local/bin/mkdocs /usr/local/bin/mkdocs

WORKDIR     /workspace
