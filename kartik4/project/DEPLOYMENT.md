# Deployment Guide 🚀

This guide provides step-by-step instructions for deploying the Online Learning Platform to various hosting providers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Build Process](#build-process)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#vercel-recommended)
  - [Netlify](#netlify)
  - [Railway](#railway)
  - [Heroku](#heroku)
- [Database Setup](#database-setup)
- [Post-Deployment](#post-deployment)

## Prerequisites

Before deploying, ensure you have:

- Node.js v18 or higher
- npm or yarn package manager
- Git repository with your code
- Account on your chosen hosting platform

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Database (if using PostgreSQL)
DATABASE_URL=your_database_connection_string

# API Configuration
API_BASE_URL=https://your-api-domain.com

# Client Configuration
VITE_API_URL=https://your-api-domain.com
```

## Build Process

The application uses a monorepo structure with separate build processes for frontend and backend:

```bash
# Install dependencies
npm install

# Build frontend
npm run build

# The built files will be in:
# - Frontend: dist/client/
# - Backend: dist/server/
```

## Deployment Options

### Vercel (Recommended)

Vercel provides excellent support for full-stack applications with automatic deployments.

#### 1. Frontend Deployment

1. **Connect Repository:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist/client
   Root Directory: client
   ```

3. **Environment Variables:**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-api.vercel.app
   ```

#### 2. Backend Deployment

1. **Create API Routes:**
   - Create `api/` directory in your repository
   - Add serverless functions for each API endpoint

2. **Deploy:**
   - Vercel will automatically deploy API routes
   - Access at `https://your-project.vercel.app/api/`

### Netlify

Great for static sites with serverless functions.

#### 1. Frontend Deployment

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist/client
   ```

3. **Environment Variables:**
   ```
   VITE_API_URL=https://your-api.netlify.app/.netlify/functions
   ```

#### 2. Backend Deployment

1. **Create Functions:**
   - Create `netlify/functions/` directory
   - Convert Express routes to Netlify functions

2. **Configure:**
   - Add `netlify.toml` configuration file
   - Deploy functions alongside frontend

### Railway

Excellent for full-stack applications with database support.

#### 1. Setup

1. **Connect Repository:**
   - Go to [Railway Dashboard](https://railway.app/)
   - Click "New Project"
   - Connect GitHub repository

2. **Configure Services:**
   - Create separate services for frontend and backend
   - Add PostgreSQL database if needed

#### 2. Backend Configuration

```dockerfile
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run start"
```

#### 3. Frontend Configuration

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run preview"
```

### Heroku

Traditional platform with good Node.js support.

#### 1. Setup

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Application:**
   ```bash
   heroku create your-app-name
   ```

#### 2. Configuration

1. **Add Buildpacks:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

2. **Environment Variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set VITE_API_URL=https://your-app.herokuapp.com
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

## Database Setup

### PostgreSQL (Production)

1. **Create Database:**
   - Use your hosting provider's database service
   - Or use external services like PlanetScale, Supabase, or Neon

2. **Run Migrations:**
   ```bash
   # Install database tools
   npm install -g drizzle-orm drizzle-kit

   # Run migrations
   npm run db:migrate
   ```

3. **Update Environment:**
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

### Switch from In-Memory to PostgreSQL

1. **Update Storage:**
   ```typescript
   // server/storage.ts
   import { drizzle } from 'drizzle-orm/node-postgres';
   import { Pool } from 'pg';

   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });

   export const db = drizzle(pool);
   ```

2. **Update Queries:**
   Replace in-memory operations with database queries using Drizzle ORM.

## Post-Deployment

### 1. Verify Deployment

- Check frontend loads correctly
- Test API endpoints
- Verify database connections
- Test user flows

### 2. Configure Domain

1. **Custom Domain:**
   - Add your domain in hosting provider settings
   - Update DNS records
   - Configure SSL/HTTPS

2. **Update Environment Variables:**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   ```

### 3. Monitor and Optimize

1. **Performance:**
   - Enable gzip compression
   - Configure CDN if needed
   - Monitor response times

2. **Security:**
   - Enable HTTPS
   - Configure CORS properly
   - Add rate limiting

3. **Analytics:**
   - Add monitoring tools
   - Set up error tracking
   - Monitor user behavior

## Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific errors

2. **API Connection Issues:**
   - Verify CORS configuration
   - Check API URL environment variables
   - Test API endpoints directly

3. **Database Connection:**
   - Verify connection string format
   - Check database permissions
   - Test connection from server

### Debug Commands

```bash
# Check build output
npm run build

# Test production build locally
npm run preview

# Check server logs
npm run server

# Verify environment variables
echo $VITE_API_URL
```

## Support

If you encounter issues during deployment:

1. Check the hosting provider's documentation
2. Review deployment logs for errors
3. Test locally first to isolate issues
4. Open an issue on GitHub for help

## Next Steps

After successful deployment:

1. Set up monitoring and alerts
2. Configure backup strategies
3. Plan for scaling and optimization
4. Set up CI/CD pipelines for automatic deployments