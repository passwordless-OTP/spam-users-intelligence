#!/bin/bash

# Spam Users Intelligence Local Testing Script
# This script helps test the Spam Users Intelligence demo locally before deployment

echo "=== Spam Users Intelligence Local Testing Helper ==="
echo ""
echo "This script will help you test the Spam Users Intelligence demo locally."
echo ""

# Check if Python is installed
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python is not installed. Please install Python to run a local server."
    echo "You can download Python from https://www.python.org/downloads/"
    exit 1
fi

# Get Python version
PYTHON_VERSION=$($PYTHON_CMD --version 2>&1)
echo "Using $PYTHON_VERSION"

# Determine the correct command based on Python version
if [[ $PYTHON_VERSION == *"Python 3"* ]]; then
    SERVER_CMD="$PYTHON_CMD -m http.server 8080"
else
    SERVER_CMD="$PYTHON_CMD -m SimpleHTTPServer 8080"
fi

echo ""
echo "Starting local web server on port 8080..."
echo "You can access the demo at: http://localhost:8080/"
echo ""
echo "To stop the server, press Ctrl+C"
echo ""

# Start the server
eval $SERVER_CMD
