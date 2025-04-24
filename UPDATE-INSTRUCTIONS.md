# GitHub Pages Update Instructions

This document explains how to update the GitHub Pages site for the Spam Users Intelligence demo.

## Optimized Workflow

We've created an optimized workflow to minimize inputs from the operator when updating the GitHub Pages site. The new workflow uses the `update-github-pages.sh` script to automatically update both the `master` and `gh-pages` branches, ensuring that your changes are reflected on the live site.

## Using the Update Script

### Basic Usage

To update the GitHub Pages site with your changes, simply run:

```bash
./update-github-pages.sh
```

This will:
1. Commit all changes to the `master` branch with a default commit message
2. Push the changes to the remote repository
3. Switch to the `gh-pages` branch
4. Merge the changes from `master` into `gh-pages`
5. Push the `gh-pages` branch to the remote repository
6. Switch back to your original branch

### Custom Commit Message

If you want to specify a custom commit message, you can pass it as an argument:

```bash
./update-github-pages.sh "Your custom commit message here"
```

### Error Handling

The script includes error handling to help identify and resolve any issues that may occur during the update process. If an error occurs, the script will display a message indicating where the error occurred and exit.

## Complete Workflow

Here's the complete workflow for making changes to the GitHub Pages site:

1. Make your changes to the files in the `github-pages` directory
2. Test your changes locally using the `test-locally.sh` script:
   ```bash
   ./test-locally.sh
   ```
3. Once you're satisfied with your changes, update the GitHub Pages site:
   ```bash
   ./update-github-pages.sh "Description of your changes"
   ```
4. Wait a few minutes for GitHub Pages to rebuild the site
5. Verify your changes on the live site: https://passwordless-otp.github.io/spam-users-intelligence/

## Troubleshooting

If you encounter any issues with the update process:

1. Check the error message displayed by the script
2. Ensure you have the necessary permissions to push to the repository
3. Make sure your local repository is up to date with the remote repository:
   ```bash
   git pull origin master
   git pull origin gh-pages
   ```
4. Try running the script again

If problems persist, you can always fall back to the manual process:
```bash
# Update master branch
git add .
git commit -m "Your commit message"
git push origin master

# Update gh-pages branch
git checkout gh-pages
git merge master
git push origin gh-pages
git checkout master
```
