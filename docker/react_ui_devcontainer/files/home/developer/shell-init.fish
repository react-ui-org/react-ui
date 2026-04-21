#!/usr/bin/env fish

# Block SSH agent forwarding if the environment variable `BLOCK_SSH_AUTH_SOCK` is set to "true"
#
# VS Code forwards the SSH agent socket to the dev container by default, so this allows users
# to opt out of that behavior if they want to disable SSH agent forwarding to isolate the dev container.
# JetBrains IDEs forward the SSH agent socket only if allowed by the user.
if test "$BLOCK_SSH_AUTH_SOCK" = "true"
    # Erase any existing SSH_AUTH_SOCK from all scopes (local, global, universal)
    # so the subsequent `set -gx` is not shadowed by a pre-existing value.
    set -e SSH_AUTH_SOCK
    # Disable SSH agent forwarding for the current shell session
    set -gx SSH_AUTH_SOCK /dev/null
    # Remove any existing SSH agent socket files created by VS Code
    find /tmp -maxdepth 1 -name 'vscode-ssh-auth-*.sock' -delete 2>/dev/null
end
