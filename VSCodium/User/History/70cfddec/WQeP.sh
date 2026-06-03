#!/usr/bin/env bash

set -e

echo "=== Installing shell setup ==="

# 1. System packages (adjust for your distro if needed)
if command -v pacman >/dev/null; then
    echo "Detected Arch-based system"
    sudo pacman -S --needed starship zoxide fastfetch bash-completion
elif command -v apt >/dev/null; then
    echo "Detected Debian-based system"
    sudo apt update
    sudo apt install -y starship zoxide fastfetch bash-completion
else
    echo "Unsupported package manager. Install manually:"
    echo "starship, zoxide, fastfetch"
fi

# 2. Restore config files
BACKUP="$HOME/Documents/bash_backup.tar.gz"

if [ -f "$BACKUP" ]; then
    echo "Restoring dotfiles from backup..."
    tar -xzvf "$BACKUP" -C "$HOME"
else
    echo "No backup found, skipping dotfile restore."
fi

# 3. Ensure starship is initialized in bashrc
if ! grep -q "starship init bash" ~/.bashrc; then
    echo 'eval "$(starship init bash)"' >> ~/.bashrc
fi

# 4. Ensure zoxide is initialized
if ! grep -q "zoxide init bash" ~/.bashrc; then
    echo 'eval "$(zoxide init bash)"' >> ~/.bashrc
fi

# 5. Reload shell
echo "Reloading shell..."
exec bash