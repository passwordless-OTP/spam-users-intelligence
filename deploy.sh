#!/bin/bash

# Spam Users Intelligence GitHub Pages Deployment Script
# This script helps with the initial setup and deployment of the Spam Users Intelligence demo to GitHub Pages

echo "=== Spam Users Intelligence GitHub Pages Deployment Helper ==="
echo ""
echo "This script will help you deploy the Spam Users Intelligence demo to GitHub Pages."
echo "Make sure you have Git installed and a GitHub account before proceeding."
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install Git first."
    exit 1
fi

# Ask for GitHub username
read -p "Enter your GitHub username: " github_username
if [ -z "$github_username" ]; then
    echo "Error: GitHub username cannot be empty."
    exit 1
fi

# Ask for repository name
read -p "Enter repository name (default: email-lookup-demo): " repo_name
repo_name=${repo_name:-email-lookup-demo}

echo ""
echo "=== Repository Setup ==="
echo ""

# Check if the directory is already a git repository
if [ -d ".git" ]; then
    echo "This directory is already a Git repository."
else
    echo "Initializing Git repository..."
    git init
    
    echo "Adding all files to the repository..."
    git add .
    
    echo "Creating initial commit..."
    git commit -m "Initial commit of Spam Users Intelligence demo"
fi

# Check if remote origin exists
if git remote | grep -q "origin"; then
    echo "Remote 'origin' already exists."
else
    echo "Adding remote origin..."
    git remote add origin "https://github.com/$github_username/$repo_name.git"
fi

echo ""
echo "=== GitHub Repository Creation ==="
echo ""
echo "Now you need to create a repository on GitHub:"
echo ""
echo "1. Go to https://github.com/new"
echo "2. Enter '$repo_name' as the Repository name"
echo "3. Add a description (e.g., 'Spam Users Intelligence - Multi-Provider Email Validation Service Demo')"
echo "4. Choose 'Public' visibility"
echo "5. Do NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""
read -p "Press Enter once you've created the repository on GitHub..."

echo ""
echo "=== Pushing to GitHub ==="
echo ""
echo "Pushing code to GitHub..."
git push -u origin main || git push -u origin master

echo ""
echo "=== GitHub Pages Setup ==="
echo ""
echo "Now you need to enable GitHub Pages:"
echo ""
echo "1. Go to https://github.com/$github_username/$repo_name/settings/pages"
echo "2. Under 'Source', select 'Deploy from a branch'"
echo "3. Under 'Branch', select 'main' (or 'master') and '/root'"
echo "4. Click 'Save'"
echo ""
echo "Your site will be published at: https://$github_username.github.io/$repo_name/"
echo ""
echo "It may take a few minutes for your site to be published."
echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Thank you for using Spam Users Intelligence!"
