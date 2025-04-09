#!/bin/bash
set -e

echo "Fixing dependency conflicts in the project..."

# Navigate to the project directory
cd "$(dirname "$0")"

# Update apexcharts to version 4.0.0 in package.json
echo "Updating apexcharts to version 4.0.0 in package.json"
sed -i 's/"apexcharts": "\^3\.40\.0"/"apexcharts": "^4.0.0"/g' package.json

# Remove node_modules and package-lock.json to ensure clean install
echo "Removing node_modules and package-lock.json"
rm -rf node_modules package-lock.json

# Reinstall dependencies
echo "Reinstalling dependencies"
npm install

echo "Dependencies fixed successfully!" 