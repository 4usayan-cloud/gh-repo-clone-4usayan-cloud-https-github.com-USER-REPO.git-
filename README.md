# 🚀 Code Examples & Git Documentation Hub

**Live Full-Stack Application with Working Backend APIs**

This repository contains comprehensive Git documentation and interactive code examples with real backend APIs. All examples are **live and deployed** - you can access them on the internet right now!

## 🌐 Live Deployment

✅ **Site is LIVE:** Visit at your Netlify URL after deployment  
✅ **Backend APIs Working:** All serverless functions running  
✅ **Auto-Refresh Data:** Real-time updates every 30 seconds  
✅ **Full CORS Support:** API accessible from any origin  

**[⚡ QUICK START](QUICK_START.md)** - Deploy in 3 commands!  
**[📖 Full Deployment Guide](DEPLOYMENT.md)** - Complete documentation

## 🚀 Quick Start

### Deploy to the Internet

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod
```

Your site with working frontend + backend will be live in seconds! See **[DEPLOYMENT.md](DEPLOYMENT.md)** for full instructions.

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-name>

# Run with serverless functions locally
netlify dev

# Access at http://localhost:8888
```

## 🔌 API Endpoints (All Live!)

Once deployed, these endpoints are available:

- **`POST /api/contact`** - Contact form submission with validation
- **`GET /api/dashboard-data`** - Real-time dashboard metrics
- **`GET /api/data?type=users`** - Sample data (users/products/tasks)
- **`GET/POST /api/db`** - JSON database operations

## 📚 Documentation

- **[Git Clone Guide](GIT_CLONE_GUIDE.md)** - Complete guide for cloning repositories
  - HTTPS vs SSH cloning methods
  - Clone options: shallow clone, specific branch, submodules
  - Common scenarios and troubleshooting
- **[Git Setup Guide](GIT_SETUP_GUIDE.md)** - Complete guide for initial repository setup and pushing to remote
  - Initial push workflow: `git remote add origin`, `git branch -M main`, `git push -u origin main`
  - Adding and managing remote repositories
  - Branch renaming and troubleshooting
- **[Git Workflow Guide](GIT_WORKFLOW_GUIDE.md)** - Complete guide for clone → change → add → commit → push workflow
- **[Deployment Guide](DEPLOYMENT.md)** - 🌐 **Deploy to internet with working APIs**
  - Quick deployment options (Netlify CLI, Git, drag & drop)
  - Architecture overview
  - API endpoint documentation
  - Local development setup
  - Troubleshooting guide

## 🎯 Interactive Examples (Frontend + Backend)

- **[Real-time Dashboard](examples/dashboard/)** - 🟢 **LIVE with API**
  - Fetches data from `/api/dashboard-data` endpoint
  - Async data fetching with error handling
  - Auto-refresh functionality every 30 seconds
  - Responsive dashboard UI with real-time metrics
  - [View Example](examples/dashboard/index.html) | [Read Documentation](examples/dashboard/README.md)

- **[React Contact Form](examples/react-contact-form/)** - 🟢 **LIVE with API**
  - Posts to `/api/contact` endpoint
  - Form validation and error handling
  - Async form submission with Fetch API
  - Loading states and user feedback
  - Three variants: Basic, Simple, Full-featured
  - [View Demo](examples/react-contact-form/demo.html) | [Read Documentation](examples/react-contact-form/README.md)

- **[React Data Fetcher](examples/react-data-fetcher/)** - 🟢 **LIVE with API**
  - Fetches from `/api/data` endpoint
  - useState and useEffect hooks pattern
  - Loading and error state management
  - Multiple data types (users/products/tasks)
  - Best practices for React data fetching
  - [View Demo](examples/react-data-fetcher/demo.html) | [Read Documentation](examples/react-data-fetcher/README.md)

- **[Python Resilience Calculator](examples/python-resilience-calculator/)** - Python mathematical calculator
  - Calculate resilience as capacity to absorb shocks
  - Multiple scenario analysis
  - Normalized resilience index
  - Comprehensive unit tests
  - [Read Documentation](examples/python-resilience-calculator/README.md)

- **[Dynamic Data Renderer](examples/dynamic-data-renderer/)** - Vanilla JavaScript with live updates
  - Render mock data dynamically with JavaScript
  - Add, delete, filter, and sort items
  - Interactive controls and real-time updates
  - No framework dependencies
  - [View Example](examples/dynamic-data-renderer/index.html) | [Read Documentation](examples/dynamic-data-renderer/README.md)

- **[Netlify Serverless Database](examples/netlify-serverless-db/)** - 🟢 **Backend API Functions**
  - Two implementations: vanilla fs and lowdb
  - GET/POST operations on JSON data
  - Serverless functions on AWS Lambda
  - Database persistence without traditional DB
  - [View Demo](examples/netlify-serverless-db/index.html) | [Read Documentation](examples/netlify-serverless-db/README.md)

## Quick Start

### Cloning an Existing Repository

Get a copy of an existing repository:

```bash
# Clone with HTTPS
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git

# Or clone with SSH
git clone git@github.com:YOUR_USERNAME/REPO_NAME.git

# Navigate to the repository
cd REPO_NAME
```

See [Git Clone Guide](GIT_CLONE_GUIDE.md) for detailed explanations and options.

### For New Repositories (Initial Setup)

Pushing a new local repository to GitHub for the first time:

```bash
# 1. Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 2. Rename branch to 'main' 
git branch -M main

# 3. Push and set up tracking
git push -u origin main
```

See [Git Setup Guide](GIT_SETUP_GUIDE.md) for detailed explanations.

### For Existing Repositories (Daily Workflow)

Working with an existing cloned repository:

```bash
# 1. Clone a repository (if not already done)
git clone [repo-url]

# 2. Navigate to the repository
cd repo-name

# 3. Make your changes (edit files)

# 4. Stage all changes
git add .

# 5. Commit with a message
git commit -m "Your descriptive message"

# 6. Push to remote
git push
```

For detailed explanations, examples, and best practices, see the [Git Workflow Guide](GIT_WORKFLOW_GUIDE.md).