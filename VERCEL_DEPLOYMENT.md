# Vercel Deployment Guide

Complete guide for deploying this application to Vercel with full frontend and backend support.

## Table of Contents
- [Quick Start](#quick-start)
- [What is Vercel?](#what-is-vercel)
- [Prerequisites](#prerequisites)
- [Deployment Methods](#deployment-methods)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Custom Domains](#custom-domains)
- [Troubleshooting](#troubleshooting)
- [Vercel vs Netlify](#vercel-vs-netlify)

## Quick Start

### Method 1: Vercel CLI (2 minutes)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel --prod
```

That's it! Your site is now live at `https://your-project.vercel.app`

### Method 2: Git Integration (Automatic Deployments)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

Every push to your main branch will automatically deploy!

### Method 3: Vercel Button

Add this to your README for one-click deployment:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/repo)
```

## What is Vercel?

Vercel is a cloud platform for static sites and Serverless Functions. Perfect for:

- ✅ **Next.js applications** (built by Vercel)
- ✅ **React applications**
- ✅ **Static sites with APIs**
- ✅ **JAMstack projects**
- ✅ **Serverless functions**

**Free Tier Includes:**
- 100 GB bandwidth/month
- 6,000 build minutes/month
- Unlimited static sites
- Serverless functions
- Automatic HTTPS
- Custom domains

## Prerequisites

- Node.js 14+ installed
- Git repository
- Vercel account (free at [vercel.com](https://vercel.com))

## Deployment Methods

### CLI Deployment

**Initial Deploy:**
```bash
vercel
```

**Production Deploy:**
```bash
vercel --prod
```

**Deploy specific directory:**
```bash
vercel --cwd ./my-directory --prod
```

### Git Integration

**Automatic Deployments:**
- Main branch → Production
- Other branches → Preview deployments
- Pull requests → Preview deployments

**Setup:**
1. Connect repository on Vercel dashboard
2. Configure build settings (if needed)
3. Push code to trigger deployment

### GitHub Actions

Create `.github/workflows/vercel.yml`:

```yaml
name: Vercel Deployment
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Configuration

### vercel.json

The `vercel.json` file in the root directory configures your deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

**Key Sections:**
- `builds`: Specifies how to build your functions
- `routes`: URL routing configuration
- `headers`: CORS and caching headers

## API Endpoints

After deployment, your API endpoints will be available at:

### 1. Contact Form API

**Endpoint:** `POST /api/contact`

**Request:**
```bash
curl -X POST https://your-site.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello!"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message!"
}
```

### 2. Dashboard Data API

**Endpoint:** `GET /api/dashboard-data`

**Request:**
```bash
curl https://your-site.vercel.app/api/dashboard-data
```

**Response:**
```json
{
  "metric1": 750,
  "metric2": 3500,
  "activeUsers": 234,
  "totalSales": "$25,432.50",
  "serverStatus": "Healthy",
  "responseTime": "125ms"
}
```

### 3. Generic Data API

**Endpoint:** `GET /api/data?type=users`

**Request:**
```bash
curl https://your-site.vercel.app/api/data?type=users
```

**Response:**
```json
{
  "type": "users",
  "count": 5,
  "data": [
    {"id": 1, "name": "John Doe", "email": "john@example.com"}
  ]
}
```

**Supported Types:**
- `users` - User data
- `products` - Product catalog
- `tasks` - Task list

## Environment Variables

### Adding Environment Variables

**Via Vercel Dashboard:**
1. Go to your project settings
2. Click "Environment Variables"
3. Add key-value pairs
4. Choose environment (Production/Preview/Development)

**Via CLI:**
```bash
vercel env add API_KEY
```

**Via vercel.json:**
```json
{
  "env": {
    "API_KEY": "@api-key-secret"
  }
}
```

### Using Environment Variables

In your serverless functions:

```javascript
module.exports = async (req, res) => {
  const apiKey = process.env.API_KEY;
  // Use the environment variable
};
```

## Custom Domains

### Adding a Custom Domain

**Via Dashboard:**
1. Go to Project Settings → Domains
2. Enter your domain
3. Configure DNS records as shown
4. Wait for SSL certificate (automatic)

**Via CLI:**
```bash
vercel domains add yourdomain.com
```

### DNS Configuration

**Option 1: Using Vercel DNS**
- Point nameservers to Vercel
- Automatic SSL and configuration

**Option 2: Using Your DNS Provider**
- Add CNAME record: `www` → `cname.vercel-dns.com`
- Add A record: `@` → Vercel IP addresses

### SSL Certificates

- Automatic SSL certificates via Let's Encrypt
- Renews automatically
- No configuration needed

## Troubleshooting

### Build Failures

**Problem:** Build fails with "Module not found"

**Solution:**
```bash
# Ensure dependencies are in package.json
npm install --save your-package
git commit and push
```

### Function Errors

**Problem:** API returns 500 error

**Solution:**
1. Check function logs: `vercel logs`
2. Test locally: `vercel dev`
3. Check environment variables

### CORS Issues

**Problem:** "CORS policy" error in browser

**Solution:** Add CORS headers in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

### Deploy Not Updating

**Problem:** Changes not appearing after deploy

**Solution:**
```bash
# Clear cache and redeploy
vercel --prod --force
```

### Function Timeout

**Problem:** Function times out after 10 seconds

**Solution:**
- Optimize function code
- Upgrade to paid plan for 60s timeout
- Use background jobs for long tasks

## Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| **Best For** | Next.js, React | JAMstack, static sites |
| **Function Path** | `/api/*` | `/.netlify/functions/*` |
| **Build Minutes** | 6,000/month | 300/month |
| **Bandwidth** | 100 GB/month | 100 GB/month |
| **Function Timeout** | 10s (free) / 60s (paid) | 10s (free) / 26s (paid) |
| **Edge Functions** | ✅ Yes | ✅ Yes |
| **Analytics** | ✅ Built-in | ❌ Paid add-on |
| **Form Handling** | ❌ Manual | ✅ Built-in |
| **Split Testing** | ❌ Manual | ✅ Built-in |
| **Dev Command** | `vercel dev` | `netlify dev` |

**Choose Vercel if:**
- You use Next.js or React
- You want more build minutes
- You prefer `/api/*` endpoints
- You want built-in analytics

**Choose Netlify if:**
- You need built-in form handling
- You want split testing
- You prefer `/.netlify/functions/*` endpoints
- You need Identity services

## Best Practices

### Performance

1. **Use Edge Functions** for global performance
2. **Enable caching** with appropriate headers
3. **Optimize images** with Vercel Image Optimization
4. **Minimize function cold starts** by keeping functions small

### Security

1. **Use environment variables** for secrets
2. **Validate all inputs** in serverless functions
3. **Enable rate limiting** to prevent abuse
4. **Use HTTPS only** (automatic on Vercel)

### Cost Optimization

1. **Monitor usage** in Vercel dashboard
2. **Optimize function execution time**
3. **Use caching** to reduce function invocations
4. **Delete unused projects**

## Local Development

### Running Locally

```bash
# Install Vercel CLI
npm install -g vercel

# Start dev server
vercel dev
```

This runs your site locally with:
- Hot reload for files
- Serverless functions at `/api/*`
- Environment variables from Vercel

### Testing Functions

```bash
# Test specific endpoint
curl http://localhost:3000/api/contact -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Testing"}'
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/serverless-functions/introduction)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)
- [CLI Reference](https://vercel.com/docs/cli)

## Support

- **Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Support:** [vercel.com/support](https://vercel.com/support)

---

**Ready to deploy?** Run `vercel --prod` and your site will be live in minutes! 🚀
