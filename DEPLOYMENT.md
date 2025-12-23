# Deployment Guide

## Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment Steps

1. **Prepare Your Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables**
   
   In Vercel dashboard, add the following environment variables:
   
   ```
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=<generate-using-openssl-rand-base64-32>
   OPENAI_API_KEY=sk-your-openai-key (optional)
   ```

4. **Set Up Database**
   
   Recommended: Use MongoDB Atlas (free tier)
   
   **MongoDB Atlas:**
   - Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free cluster (M0 tier)
   - Create database user with username/password
   - Network Access → Add IP (0.0.0.0/0 for all IPs)
   - Get connection string from "Connect" button
   - Replace <password> in connection string
   - Add to DATABASE_URL in Vercel

5. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - After deployment, push schema to MongoDB:
   ```bash
   # In Vercel Dashboard → Settings → Environment Variables
   # Or via CLI after connecting to your project
   npx prisma db push
   ```

## Deploy to Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   Add the same variables as Vercel in Netlify dashboard

## Deploy to Railway

1. **New Project**
   - Visit [railway.app](https://railway.app)
   - New Project → Deploy from GitHub repo

2. **Add PostgreSQL**
   - Add PostgreSQL plugin
   - Copy DATABASE_URL from variables

3. **Environment Variables**
   Add all required variables in Railway dashboard

## Post-Deployment

1. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   ```

2. **Test the Application**
   - Register a new user
   - Create tasks
   - Test all CRUD operations
   - Verify AI features (if OpenAI key is set)

3. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor database connections
   - Review error logs

## Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check TypeScript errors: `npm run build` locally
- Verify all dependencies are in package.json

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is accessible from deployment platform
- Ensure SSL is enabled if required

### Authentication Issues
- NEXTAUTH_URL must match your domain exactly
- NEXTAUTH_SECRET must be set and secured
- Check callback URLs in OAuth providers (if used)
