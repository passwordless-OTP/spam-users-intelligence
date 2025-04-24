# Hosting Spam Users Intelligence on GitHub Pages

This guide explains how to host the Spam Users Intelligence demo on GitHub Pages, making it accessible online for demonstration purposes.

## What is GitHub Pages?

GitHub Pages is a free hosting service provided by GitHub that allows you to publish static websites directly from a GitHub repository. It's perfect for hosting demos, documentation, and other static content.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Basic familiarity with Git commands

## Files Included in this Demo

The Spam Users Intelligence demo includes the following files:

- `index.html` - The main landing page
- `email-lookup-demo-app.html` - The interactive email validation tool
- `email-dashboard-tabbed.html` - The merchant dashboard mockup
- `email-rules.html` - The email security rules configuration page
- `provider-api-endpoints.html` - Documentation of provider API endpoints
- `email-provider-comparison.html` - Comparison of different email validation providers
- `README.md` - Project documentation
- `.gitignore` - Specifies files to exclude from the repository
- `deploy.sh` - Helper script for initial deployment
- `update-github-pages.sh` - Optimized script for updating both master and gh-pages branches

## Deployment Options

### Option 1: Using the Deployment Script (Recommended)

We've included a deployment script that guides you through the process of setting up a GitHub repository and enabling GitHub Pages.

1. Open a terminal in the `github-pages` directory
2. Run the deployment script:
   ```
   ./deploy.sh
   ```
3. Follow the prompts in the script

The script will:
- Initialize a Git repository (if not already initialized)
- Guide you through creating a GitHub repository
- Push the code to GitHub
- Provide instructions for enabling GitHub Pages

### Option 2: Manual Deployment

If you prefer to deploy manually, follow these steps:

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Name your repository (e.g., `email-lookup-demo`)
   - Make it public
   - Do not initialize with README, .gitignore, or license

2. Initialize a Git repository in the `github-pages` directory:
   ```
   cd tasks/email-lookups/github-pages
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Add the GitHub repository as a remote and push:
   ```
   git remote add origin https://github.com/YOUR_USERNAME/email-lookup-demo.git
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "Deploy from a branch"
   - Select "main" branch and "/root" folder
   - Click "Save"

5. Wait for deployment to complete:
   - GitHub will show a message saying "Your site is being published at..."
   - It may take a few minutes for your site to be published

## Accessing Your Site

Once deployed, your site will be available at:
```
https://YOUR_USERNAME.github.io/email-lookup-demo/
```

Replace `YOUR_USERNAME` with your GitHub username and `email-lookup-demo` with your repository name if different.

## Updating Your Site

To update your site after making changes:

### Option 1: Using the Optimized Update Script (Recommended)

We've created an optimized workflow that minimizes inputs from the operator and ensures changes are reflected on both the master and gh-pages branches:

1. Make your changes to the files
2. Run the update script:
   ```
   ./update-github-pages.sh
   ```
   
   Or with a custom commit message:
   ```
   ./update-github-pages.sh "Your custom commit message here"
   ```

The script will:
- Add all changed files to the repository
- Commit changes with the provided message (or a default message)
- Push changes to the master branch
- Switch to the gh-pages branch
- Merge changes from master into gh-pages
- Push the gh-pages branch
- Switch back to your original branch

For detailed instructions on using this script, see [UPDATE-INSTRUCTIONS.md](UPDATE-INSTRUCTIONS.md).

### Option 2: Using the Legacy Push Script

The original push script is still available for backward compatibility:

1. Make your changes to the files
2. Run the push script:
   ```
   ./push-to-github.sh
   ```
3. Follow the prompts in the script

The script will:
- Add all changed files to the repository
- Prompt you for a commit message
- Push the changes to GitHub
- Provide feedback on the success or failure of the push

Note: This script only updates the master branch and may not update the GitHub Pages site if it's configured to deploy from the gh-pages branch.

### Option 3: Manual Update

If you prefer to update manually:

1. Make your changes to the files
2. Commit the changes:
   ```
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```
   git push
   ```

GitHub Pages will automatically update your site with the new changes.

## Customizing Your Site

You can customize the site by:

- Modifying the HTML, CSS, and JavaScript files
- Adding your own logo and branding
- Updating the content to match your specific use case

## Troubleshooting

If your site doesn't appear after deployment:

1. Check the GitHub Pages settings in your repository to ensure it's enabled correctly
2. Verify that your repository is public
3. Check for any error messages in the GitHub Pages section of your repository settings
4. Ensure your files are in the correct branch and directory

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Basics](https://pages.github.com/)
- [Custom Domains with GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
