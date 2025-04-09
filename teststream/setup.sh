
#!/bin/bash
set -e

# Get the absolute path of the script directory
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$CURRENT_DIR"

echo "Current directory: $CURRENT_DIR"
echo "Workspace directory: $WORKSPACE_DIR"

# Navigate to the workspace directory
cd "$WORKSPACE_DIR"

# Install dependencies
echo "Installing dependencies..."
npm install

# Start the development server
echo "Starting the development server..."
npm start
