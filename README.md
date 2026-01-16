# gh-repo-clone-4usayan-cloud-https-github.com-USER-REPO.git-

## Setup Instructions

### Configuring Git Remote

If you need to change the git remote origin to point to your own repository (e.g., for the resilience-dashboard project), follow these steps:

1. **Navigate to your project directory:**
   ```bash
   cd /Users/sayansen/Desktop/resilience_map_source
   ```

2. **Remove the existing remote origin:**
   ```bash
   git remote remove origin
   ```

3. **Add your new remote origin:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/resilience-dashboard.git
   ```
   
   Replace `YOUR_USERNAME` with your actual GitHub username.

4. **Push your code to the new remote:**
   ```bash
   git push -u origin main
   ```

### Verification

After completing the above steps, you can verify your remote configuration:

```bash
git remote -v
```

This should display your new origin URL for both fetch and push operations.