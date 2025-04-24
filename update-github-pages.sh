#!/bin/bash

# Spam Users Intelligence GitHub Pages Update Script
# This script automates the process of updating both master and gh-pages branches
# to ensure changes are reflected on the live GitHub Pages site

# Default commit message
DEFAULT_COMMIT_MESSAGE="Update Spam Users Intelligence demo"

# Get commit message from command line argument or use default
COMMIT_MESSAGE=${1:-"$DEFAULT_COMMIT_MESSAGE"}

echo "=== Spam Users Intelligence GitHub Pages Update Helper ==="
echo ""
echo "This script will update both master and gh-pages branches to ensure your changes"
echo "are reflected on the live GitHub Pages site."
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
    echo "Error: Remote 'origin' not found. Please set it up manually:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    exit 1
fi

# Function to handle errors
handle_error() {
    echo ""
    echo "=== Error Occurred ==="
    echo ""
    echo "There was an error during the $1 process."
    echo "Please check the error message above and try again."
    exit 1
}

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Step 1: Update master branch
echo ""
echo "=== Updating Master Branch ==="
echo ""

# Add all files to the repository
echo "Adding all files to the repository..."
git add . || handle_error "git add"

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "No changes to commit on master branch."
else
    # Commit changes
    echo "Committing changes with message: '$COMMIT_MESSAGE'..."
    git commit -m "$COMMIT_MESSAGE" || handle_error "git commit"

    # Push to GitHub
    echo "Pushing to master branch..."
    git push -u origin master || git push -u origin main || handle_error "git push"
    
    echo "Master branch updated successfully."
fi

# Step 2: Update gh-pages branch
echo ""
echo "=== Updating gh-pages Branch ==="
echo ""

# Check if gh-pages branch exists locally
if git branch | grep -q "gh-pages"; then
    echo "Switching to gh-pages branch..."
    git checkout gh-pages || handle_error "git checkout gh-pages"
else
    # Check if gh-pages branch exists remotely
    if git ls-remote --heads origin | grep -q "gh-pages"; then
        echo "Creating local gh-pages branch tracking remote..."
        git checkout -b gh-pages origin/gh-pages || handle_error "git checkout -b gh-pages"
    else
        echo "Creating new gh-pages branch..."
        git checkout --orphan gh-pages || handle_error "git checkout --orphan"
        git reset --hard || handle_error "git reset"
        git add . || handle_error "git add"
        git commit -m "Initial gh-pages commit" || handle_error "git commit"
    fi
fi

# Check if we need to merge changes from master
echo "Merging changes from master branch..."
git merge master -m "Merge master into gh-pages" || git merge main -m "Merge main into gh-pages" || handle_error "git merge"

# Push to GitHub
echo "Pushing to gh-pages branch..."
git push -u origin gh-pages || handle_error "git push gh-pages"

echo "gh-pages branch updated successfully."

# Return to original branch
echo ""
echo "Switching back to $CURRENT_BRANCH branch..."
git checkout $CURRENT_BRANCH || handle_error "git checkout $CURRENT_BRANCH"

# Success message
echo ""
echo "=== Update Complete ==="
echo ""
echo "Your changes have been pushed to both master and gh-pages branches."
echo "The site should be updated shortly at your GitHub Pages URL."
echo ""
echo "Thank you for using Spam Users Intelligence!"
