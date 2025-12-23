# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended - free cloud hosting)
- Git installed
- Code editor (VS Code recommended)

## 5-Minute Setup

### 1. Install Dependencies (1 min)
```bash
npm install
```

### 2. Configure Environment (2 min)

Create `.env` file in root directory:

```env
# Required: Database Connection
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority"

# Required: Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Optional: AI Features
OPENAI_API_KEY="sk-your-key-here"
```

**Quick MongoDB Setup:**

Option A - MongoDB Atlas (Recommended, Free):
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user (username/password)
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string and replace <password>
6. Copy to DATABASE_URL in .env

Option B - Local MongoDB:
```bash
# Install MongoDB, then:
mongod --dbpath /path/to/data
# Use: DATABASE_URL="mongodb://localhost:27017/taskmanagement"
```

Option C - Docker:
```bash
docker run --name mongodb -p 27017:27017 -d mongo
# Use: DATABASE_URL="mongodb://localhost:27017/taskmanagement"
```

### 3. Initialize Database (1 min)
```bash
npx prisma generate
npx prisma db push
```

**Note**: MongoDB with Prisma uses `db push` instead of migrations.

### 4. Start Development Server (1 min)
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Register Account**: Click "Get Started" → Create account
2. **Create Task**: Click "+ New Task" → Fill form
3. **Try AI**: Enter task title → Click "✨ AI Suggest"
4. **Manage Tasks**: Edit, delete, filter tasks
5. **Explore**: Try different statuses and priorities

## Common Issues

### Database Connection Failed
```bash
# Test connection
npx prisma db push
# If fails, verify DATABASE_URL in .env
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### AI Features Not Working
- Verify OPENAI_API_KEY is set correctly
- Check API key has credits
- AI features are optional - app works without them

## What's Next?

### Customize
- Update [Footer.tsx](components/Footer.tsx) with your name and links
- Modify color scheme in [tailwind.config.ts](tailwind.config.ts)
- Add your logo in [public/](public/) folder

### Deploy
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- Recommended: Vercel (zero-config deployment)

### Explore Code
- **API Routes**: [app/api/](app/api/)
- **Components**: [components/](components/)
- **Database Schema**: [prisma/schema.prisma](prisma/schema.prisma)
- **Authentication**: [lib/auth.ts](lib/auth.ts)

## Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build

# Database
npx prisma studio    # Visual database editor
npx prisma migrate dev   # Create migration
npx prisma generate  # Update Prisma Client

# Utilities
npm run lint         # Run ESLint
npx prisma format    # Format schema file
```

## Support

- 📖 Full Documentation: [README.md](README.md)
- 🚀 Deployment Guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- 📊 Project Summary: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

Ready to build something amazing! 🚀
