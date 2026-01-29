# GitHub Deployment Guide

Deploy your application directly on GitHub using **GitHub Pages** with automated deployment via **GitHub Actions**.

## Table of Contents

- [Quick Setup](#quick-setup)
- [What is GitHub Pages?](#what-is-github-pages)
- [Deployment Options](#deployment-options)
- [Automatic Deployment](#automatic-deployment)
- [Manual Deployment](#manual-deployment)
- [Custom Domain Setup](#custom-domain-setup)
- [GitHub Pages vs Other Platforms](#github-pages-vs-other-platforms)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)

## Quick Setup

Deploy your site in 3 simple steps:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. Click **Save**

### Step 2: Push Your Code

```bash
git push origin main
```

The GitHub Actions workflow will automatically deploy your site!

### Step 3: Access Your Site

Your site will be available at:
```
https://<your-username>.github.io/<repository-name>/
```

**That's it!** 🎉

## What is GitHub Pages?

GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files directly from a GitHub repository and publishes a website.

### Features:
- ✅ **Free hosting** for public repositories
- ✅ **Automatic HTTPS** with SSL certificate
- ✅ **Custom domain** support
- ✅ **CDN delivery** for fast loading
- ✅ **Version control** integration
- ✅ **Automatic deployment** with GitHub Actions

### Perfect For:
- Portfolio websites
- Documentation sites
- Project demos
- Landing pages
- Static web applications

## Deployment Options

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

This repository is pre-configured with a GitHub Actions workflow that automatically deploys to GitHub Pages whenever you push to the main branch.

**Workflow file:** `.github/workflows/deploy.yml`

**What it does:**
1. Triggers on push to `main` branch
2. Checks out the code
3. Sets up GitHub Pages
4. Uploads the site content
5. Deploys to GitHub Pages

**To use:**
```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main

# GitHub Actions will automatically deploy
```

### Option 2: Manual Trigger

You can also trigger the deployment manually:

1. Go to **Actions** tab in your repository
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select the branch (usually `main`)
5. Click **Run workflow**

### Option 3: Classic GitHub Pages (Branch-based)

Alternative method using a specific branch:

1. Go to Settings → Pages
2. Source: Select **Deploy from a branch**
3. Branch: Select `main` and `/ (root)`
4. Click Save

## Automatic Deployment

The repository includes a pre-configured GitHub Actions workflow.

### How It Works

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # Deploys when pushing to main
  workflow_dispatch:     # Allows manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
      - uses: actions/deploy-pages@v4
```

### Monitoring Deployments

**Check deployment status:**
1. Go to **Actions** tab
2. See recent workflow runs
3. Click on a run to see details
4. Green checkmark = successful deployment

**Add status badge to README:**
```markdown
![Deploy Status](https://github.com/<username>/<repo>/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

## Manual Deployment

If you prefer manual deployment without GitHub Actions:

### Using gh-pages Package

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"scripts": {
  "deploy": "gh-pages -d ."
}

# Deploy
npm run deploy
```

### Using Git Directly

```bash
# Create gh-pages branch
git checkout --orphan gh-pages

# Add your files
git add .
git commit -m "Deploy to GitHub Pages"

# Push to gh-pages branch
git push origin gh-pages

# Configure Pages to use gh-pages branch in Settings
```

## Custom Domain Setup

### Step 1: Add CNAME File

Create a `CNAME` file in the repository root:

```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Step 2: Configure DNS

Add DNS records with your domain provider:

**For apex domain (example.com):**
```
Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

**For subdomain (www.example.com):**
```
Type: CNAME
Name: www
Value: <username>.github.io
```

### Step 3: Enable in GitHub

1. Go to Settings → Pages
2. Custom domain: Enter your domain
3. Check "Enforce HTTPS"
4. Click Save

**DNS propagation may take up to 24-48 hours.**

## GitHub Pages vs Other Platforms

| Feature | GitHub Pages | Netlify | Vercel |
|---------|--------------|---------|---------|
| **Cost** | Free | Free tier | Free tier |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Serverless Functions** | ❌ No | ✅ Yes | ✅ Yes |
| **Build Process** | Basic | Advanced | Advanced |
| **Deployment** | Git push | Git push | Git push |
| **CDN** | ✅ Yes | ✅ Yes | ✅ Yes |

### When to Use GitHub Pages

**✅ Good for:**
- Static websites (HTML, CSS, JS)
- Documentation sites
- Portfolio pages
- Project demos
- GitHub-hosted projects

**❌ Not ideal for:**
- Apps needing serverless functions
- Dynamic server-side rendering
- Database operations
- Complex build processes

**💡 Solution:** Use GitHub Pages for frontend + Netlify for backend APIs

## Limitations

### What Works

✅ HTML, CSS, JavaScript files
✅ Images and static assets
✅ Client-side React/Vue/Angular
✅ Static site generators (Jekyll, Hugo, etc.)
✅ Single Page Applications (SPAs)

### What Doesn't Work

❌ Serverless functions (no `/api/` endpoints)
❌ Server-side rendering (SSR)
❌ Database connections
❌ Environment variables (in runtime)
❌ File uploads/processing
❌ WebSockets

### File Size Limits

- **Repository size:** < 1 GB recommended
- **File size:** < 100 MB per file
- **Bandwidth:** 100 GB/month (soft limit)
- **Builds:** 10 per hour

## Handling Backend APIs

Since GitHub Pages doesn't support serverless functions, here are your options:

### Option 1: Deploy Backend Separately

**Frontend:** GitHub Pages
**Backend:** Netlify/Vercel/Heroku

```javascript
// Update API endpoints to point to your backend
const API_BASE = 'https://your-api.netlify.app';
fetch(`${API_BASE}/api/contact`, { ... });
```

### Option 2: Use External APIs

```javascript
// Use third-party services
fetch('https://formspree.io/f/your-form-id', { ... });
```

### Option 3: Deploy Everything to Netlify

For full-stack apps with APIs, use Netlify or Vercel instead (configuration already included in this repo).

## Environment Variables

GitHub Pages doesn't support runtime environment variables. Options:

### Option 1: Build-time Variables

Use GitHub Actions secrets:

```yaml
# .github/workflows/deploy.yml
env:
  VITE_API_URL: ${{ secrets.API_URL }}
```

### Option 2: Configuration File

Create a `config.js`:

```javascript
// config.js
window.CONFIG = {
  API_URL: 'https://your-api.com'
};
```

### Option 3: Separate Config per Environment

```javascript
// config.production.js
export const API_URL = 'https://api.example.com';
```

## Troubleshooting

### Site Not Updating

**Problem:** Changes not visible after push

**Solutions:**
1. **Clear browser cache:** Ctrl+Shift+R (hard refresh)
2. **Check Actions tab:** Verify deployment succeeded
3. **Wait a few minutes:** Deployments can take 1-5 minutes
4. **Check workflow logs:** Look for errors in Actions tab

### 404 Errors

**Problem:** Pages show 404 error

**Solutions:**
1. **Verify file paths:** All paths should be relative
2. **Check .nojekyll:** Ensure file exists in root
3. **Case sensitivity:** GitHub Pages is case-sensitive
4. **Base URL:** For repo sites, adjust paths for subdir

### Images Not Loading

**Problem:** Images don't display

**Solutions:**
```html
<!-- ❌ Bad: absolute path -->
<img src="/images/logo.png">

<!-- ✅ Good: relative path -->
<img src="./images/logo.png">

<!-- ✅ Good: with base path -->
<img src="./assets/logo.png">
```

### JavaScript Errors

**Problem:** JS modules not loading

**Solutions:**
1. **Check paths:** Use relative paths
2. **CORS issues:** All resources must be same origin
3. **Module type:** Ensure `<script type="module">`
4. **Console errors:** Check browser console

### API Calls Failing

**Problem:** Fetch requests not working

**Remember:** GitHub Pages is static-only. For APIs:
- Deploy backend to Netlify/Vercel
- Use external API services
- Configure CORS on API server

## Best Practices

### 1. Use Relative Paths

```html
<!-- ✅ Good -->
<link rel="stylesheet" href="./styles.css">
<script src="./script.js"></script>

<!-- ❌ Bad -->
<link rel="stylesheet" href="/styles.css">
```

### 2. Optimize Assets

```bash
# Minimize images
# Use WebP format
# Lazy load images
# Minify CSS/JS
```

### 3. Add .nojekyll

Prevents Jekyll processing (already included):
```bash
touch .nojekyll
```

### 4. Configure 404 Page

Create `404.html` for custom error page:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Page Not Found</title>
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <a href="/">Go Home</a>
</body>
</html>
```

### 5. Security Headers

Add security headers in HTML:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
<meta http-equiv="X-Frame-Options" content="DENY">
```

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Summary

**Quick Commands:**

```bash
# Enable GitHub Pages in Settings → Pages → Source: GitHub Actions

# Deploy (automatic with Actions)
git push origin main

# Check deployment
# Visit: https://github.com/<username>/<repo>/actions

# View site
# Visit: https://<username>.github.io/<repo>/
```

**✅ Ready to deploy on GitHub!**
