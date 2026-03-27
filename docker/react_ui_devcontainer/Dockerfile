FROM debian:bookworm AS react-ui-devcontainer

# Build arguments for user configuration
# Those can be changed using fixuid's remapping feature when running the container
ARG USERNAME=developer
ARG USER_UID=1000
ARG USER_GID=1000
ARG HOME="/home/${USERNAME}"

# Default shell and editor settings, overridable via .env
ENV EDITOR="vim"
ENV VISUAL="vim"
ENV SHELL="/bin/bash"
ENV CLAUDE_CONFIG_DIR="${HOME}/.config/claude"
ENV OPENCODE_CONFIG="${HOME}/.config/opencode/opencode.json"
ENV OPENCODE_CONFIG_DIR="${HOME}/.config/opencode"

# Install sudo, editors (vim, nano), SSH client, Git, shells (zsh, fish) and common utilities
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        sudo \
        ca-certificates \
        curl \
        gnupg \
        vim \
        nano \
        openssh-client \
        git \
        fish \
        zsh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create the user
RUN addgroup --gid $USER_GID $USERNAME && \
    adduser --uid $USER_UID --ingroup $USERNAME --home $HOME --shell $SHELL --disabled-password --gecos "" $USERNAME && \
    echo "$USERNAME ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME

# Install fixuid to allow remapping the `developer` user to the host UID/GID when running in a container
RUN USER=$USERNAME && \
    GROUP=$USERNAME && \
    ARCH=$(dpkg --print-architecture) && \
    curl -SsL https://github.com/boxboat/fixuid/releases/download/v0.6.0/fixuid-0.6.0-linux-${ARCH}.tar.gz | tar -C /usr/local/bin -xzf - && \
    chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid && \
    printf "user: $USER\ngroup: $GROUP\npaths: [$HOME]" > /etc/fixuid/config.yml

# Install Docker CLI and Compose plugin to enable Docker-from-Docker
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --batch --yes --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
        https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
        > /etc/apt/sources.list.d/docker.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends docker-ce-cli docker-compose-plugin && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Switch to the `developer` user for all user-level installations
USER $USERNAME:$USERNAME

# Install Oh My Zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Persist terminal history across container restarts via a Docker volume
# mounted at $HOME/.terminal_history in docker-compose.base.yml
RUN mkdir -p "$HOME/.terminal_history" && \
    touch "$HOME/.terminal_history/bash_history" && \
    touch "$HOME/.terminal_history/zsh_history" && \
    touch "$HOME/.terminal_history/fish_history" && \
    SNIPPET_BASH="export PROMPT_COMMAND='history -a' && export HISTFILE=$HOME/.terminal_history/bash_history" && \
    echo "$SNIPPET_BASH" >> "$HOME/.bashrc" && \
    SNIPPET_ZSH="export PROMPT_COMMAND='history -a' && export HISTFILE=$HOME/.terminal_history/zsh_history" && \
    echo "$SNIPPET_ZSH" >> "$HOME/.zshrc" && \
    mkdir -p "$HOME/.local/share/fish" && \
    touch "$HOME/.terminal_history/fish_history" && \
    ln -sf "$HOME/.terminal_history/fish_history" "$HOME/.local/share/fish/fish_history"

# Install Claude Code CLI
RUN mkdir -p "$HOME/.config/claude" && \
    curl -fsSL https://claude.ai/install.sh | bash

# Install Open Code CLI
RUN curl -fsSL https://opencode.ai/install | bash -s -- --no-modify-path

# Install GitHub Copilot CLI
# Note: Copilot CLI does not support XDG configuration, see:
# * <https://github.com/github/copilot-cli/issues/1347>
# * <https://github.com/github/copilot-cli/issues/1750>
RUN curl -fsSL https://gh.io/copilot-install | PREFIX="$HOME/.local" bash

# Wrapper scripts for AI coding assistants ensure they are available in PATH
# and handle necessary environment variable setup
COPY --chmod=+x files/usr/local/bin/copilot /usr/local/bin/copilot
COPY --chmod=+x files/usr/local/bin/claude /usr/local/bin/claude
COPY --chmod=+x files/usr/local/bin/opencode /usr/local/bin/opencode
COPY --chmod=+x files/usr/local/bin/docker-entrypoint /usr/local/bin/docker-entrypoint
COPY --chmod=+x files/home/$USERNAME/shell-init.sh ${HOME}/shell-init.sh

# Wrapper scripts that execute commands inside the appropriate Docker containers.
# These scripts use Docker-from-Docker to run the commands in the context of the
# respective Docker containers, allowing container agnostic development workflows.
COPY --chmod=+x files/usr/local/bin/node /usr/local/bin/node
COPY --chmod=+x files/usr/local/bin/npm /usr/local/bin/npm
COPY --chmod=+x files/usr/local/bin/npx /usr/local/bin/npx
COPY --chmod=+x files/usr/local/bin/mkdocs /usr/local/bin/mkdocs

# Ensure /usr/local/bin takes precedence over VS Code injected paths
# and run profile script on every shell startup to apply .env configuration
RUN mkdir -p $HOME/.config/fish && \
    echo 'export PATH="/usr/local/bin:$PATH"' >> $HOME/.bashrc && \
    echo 'export PATH="/usr/local/bin:$PATH"' >> $HOME/.zshrc && \
    echo 'set -gx PATH /usr/local/bin $PATH' >> $HOME/.config/fish/config.fish && \
    echo '$HOME/shell-init.sh' >> $HOME/.bashrc && \
    echo '$HOME/shell-init.sh' >> $HOME/.zshrc && \
    echo '$HOME/shell-init.sh' >> $HOME/.config/fish/config.fish

# Set the default working directory when starting a container from this image
WORKDIR /workspace

# Set the default command to run when starting a container from this image
# The fixuid command will adjust the `developer` user's UID and GID to match
# the host user's UID and GID when running in a container, ensuring that
# any files created by the `developer` user inside the container have
# the correct ownership on the host system.
ENTRYPOINT ["docker-entrypoint"]
