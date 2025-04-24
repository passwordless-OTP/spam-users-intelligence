#!/bin/bash

# Spam Users Intelligence GitHub Push Script
# This script helps push the Spam Users Intelligence demo to an existing GitHub repository

echo "=== Spam Users Intelligence GitHub Push Helper ==="
echo ""
echo "This script will help you push the Spam Users Intelligence demo to GitHub."
echo "Make sure you have Git installed and a GitHub repository already set up."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install Git first."
    exit 1
fi

# Check if the directory is already a git repository
if [ ! -d ".git" ]; then
    echo "Error: This directory is not a Git repository. Please run deploy.sh first to set up the repository."
    exit 1
fi

# Check if remote origin exists
if ! git remote | grep -q "origin"; then
    echo "Remote 'origin' not found. Please set it up manually:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    exit 1
fi

# Add all files to the repository
echo "Adding all files to the repository..."
git add .

# Commit changes
echo "Committing changes..."
read -p "Enter commit message (default: Update Spam Users Intelligence demo): " commit_message
commit_message=${commit_message:-"Update Spam Users Intelligence demo"}
git commit -m "$commit_message"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main || git push -u origin master

# Check if push was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "=== Push Complete ==="
    echo ""
    echo "Your changes have been pushed to GitHub."
    echo "The site should be updated shortly at your GitHub Pages URL."
    echo ""
    echo "If this is your first push and GitHub Pages is not yet enabled:"
    echo ""
    echo "1. Go to your repository on GitHub"
    echo "2. Click on 'Settings'"
    echo "3. Navigate to 'Pages' in the sidebar"
    echo "4. Under 'Source', select 'Deploy from a branch'"
    echo "5. Select 'main' branch and '/root' folder"
    echo "6. Click 'Save'"
    echo ""
else
    echo ""
    echo "=== Push Failed ==="
    echo ""
    echo "There was an error pushing to GitHub. Please check your repository settings and try again."
    echo ""
fi

echo "Thank you for using Spam Users Intelligence!"
