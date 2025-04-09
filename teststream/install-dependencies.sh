
#!/bin/bash
set -e

# Get the absolute path of the script directory
CURRENT_DIR="$(pwd)"
WORKSPACE_DIR="/home/suresh/work/code/61_ai_lov_test/workspace"

echo "Current directory: $CURRENT_DIR"
echo "Workspace directory: $WORKSPACE_DIR"

# Navigate to the workspace directory
cd "$WORKSPACE_DIR"

# Remove MUI dependencies
echo "Removing Material UI dependencies..."
npm uninstall @emotion/react @emotion/styled @mui/icons-material @mui/material @mui/x-data-grid

# Install Tailwind CSS and its dependencies
echo "Installing Tailwind CSS and dependencies..."
npm install -D tailwindcss postcss autoprefixer
npm install @heroicons/react

# Initialize Tailwind CSS if not already done
echo "Tailwind CSS configuration created."

# Install any missing dependencies
npm install

# Start the application
echo "Starting the application..."
npm start
