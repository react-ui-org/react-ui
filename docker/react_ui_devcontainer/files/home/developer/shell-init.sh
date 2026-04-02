#!/bin/sh

# Block SSH agent forwarding if the environment variable `BLOCK_SSH_AUTH_SOCK` is set to "true"
#
# VS Code forwards the SSH agent socket to the dev container by default, so this allows users
# to opt out of that behavior if they want to disable SSH agent forwarding to isolate the dev container.
# JetBrains IDEs forward the SSH agent socket only if allowed by the user.
if [ "$BLOCK_SSH_AUTH_SOCK" = "true" ]; then
  # Disable SSH agent forwarding for the current shell session
  export SSH_AUTH_SOCK=/dev/null
  # Remove any existing SSH agent socket files created by VS Code
  find /tmp -maxdepth 1 -name 'vscode-ssh-auth-*.sock' -delete 2>/dev/null
fi
