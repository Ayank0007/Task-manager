# MongoDB Setup Guide

## Why MongoDB?

MongoDB is a great choice for this application because:
- **Free Cloud Hosting**: MongoDB Atlas offers generous free tier
- **Flexible Schema**: Easy to add new fields without migrations
- **Fast Development**: No complex migration files to manage
- **Scalable**: Handles large amounts of data efficiently
- **JSON-like**: Works naturally with JavaScript/TypeScript

## Quick Setup (5 minutes)

### Option 1: MongoDB Atlas (Recommended - Free Cloud Hosting)

#### Step 1: Create Account
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Click "Try Free" and create an account
3. Choose "Build a Database" → "M0 (Free tier)"

#### Step 2: Configure Database
1. **Cluster Configuration**:
   - Cloud Provider: Choose any (AWS recommended)
   - Region: Choose closest to you
   - Cluster Name: Leave default or name it "TaskManager"
   - Click "Create"

2. **Security Setup**:
   - **Authentication**: Create a database user
     - Username: `taskmanager_user` (or your choice)
     - Password: Click "Autogenerate" or create a strong password
     - **IMPORTANT**: Save this password!
   - Click "Create User"

3. **Network Access**:
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses
   - Click "Confirm"

#### Step 3: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. **Driver**: Node.js
5. **Version**: 5.5 or later
6. Copy the connection string

It looks like:
```
mongodb+srv://taskmanager_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### Step 4: Update .env File
1. Replace `<password>` with your actual password
2. Add database name before the `?`:
```env
DATABASE_URL="mongodb+srv://taskmanager_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority"
```

#### Step 5: Initialize Database
```bash
npx prisma generate
npx prisma db push
```

✅ Done! Your MongoDB database is ready!

---

### Option 2: Local MongoDB (For Development)

#### Step 1: Install MongoDB

**Windows:**
1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run installer
3. Choose "Complete" installation
4. Install as a service

**macOS (with Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Step 2: Update .env
```env
DATABASE_URL="mongodb://localhost:27017/taskmanagement"
```

#### Step 3: Initialize Database
```bash
npx prisma generate
npx prisma db push
```

---

### Option 3: Docker (Quick & Clean)

```bash
# Start MongoDB container
docker run --name mongodb -p 27017:27017 -d mongo:latest

# Update .env
DATABASE_URL="mongodb://localhost:27017/taskmanagement"

# Initialize
npx prisma generate
npx prisma db push
```

---

## Verify Connection

Test your connection:
```bash
npx prisma db push
```

If successful, you'll see:
```
✔ Database synchronized with Prisma schema
```

---

## View Your Data

### Using MongoDB Atlas UI
1. Go to your Atlas cluster
2. Click "Browse Collections"
3. See User and Task collections

### Using Prisma Studio
```bash
npx prisma studio
```
Opens a web UI at http://localhost:5555

### Using MongoDB Compass (Desktop App)
1. Download from [mongodb.com/products/compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse collections visually

---

## Common Issues & Solutions

### Issue: "Bad auth: Authentication failed"
**Solution**: 
- Double-check username and password
- Make sure you replaced `<password>` in connection string
- Ensure user has read/write permissions

### Issue: "Connection timeout"
**Solution**:
- Verify IP address is whitelisted (0.0.0.0/0 for development)
- Check network/firewall settings
- Wait a few minutes after creating cluster

### Issue: "Database does not exist"
**Solution**:
- MongoDB creates databases on first write
- Just run `npx prisma db push` - it will create automatically

### Issue: Local MongoDB won't start
**Solution**:
```bash
# Check if running
mongosh

# If not, start service:
# Windows: Services app → MongoDB → Start
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

---

## MongoDB vs PostgreSQL - Key Differences

| Feature | MongoDB | PostgreSQL |
|---------|---------|------------|
| Schema | Flexible, schema-less | Strict, fixed schema |
| Migrations | Not needed (db push) | Required (migrate) |
| Data Format | BSON (JSON-like) | Relational tables |
| IDs | ObjectId (24 chars) | UUID/CUID |
| Scaling | Horizontal (sharding) | Vertical (powerful server) |
| Queries | Document-based | SQL queries |

---

## MongoDB Best Practices

### 1. Connection String Security
```env
# ❌ Bad - exposed in code
const url = "mongodb+srv://user:pass123@..."

# ✅ Good - in environment variable
DATABASE_URL="mongodb+srv://..."
```

### 2. Index Important Fields
Already configured in schema:
- `userId` - fast task lookups per user
- `status` - fast filtering by status
- `priority` - fast filtering by priority

### 3. Use Connection Pooling
Prisma handles this automatically!

### 4. Backup Your Data
**MongoDB Atlas**:
- Go to Cluster → Backup
- Free automated backups available

**Local**:
```bash
mongodump --db taskmanagement --out backup/
```

---

## Production Deployment

### MongoDB Atlas (Recommended)
1. Create production cluster (can still use free M0)
2. Create separate production user with strong password
3. Whitelist Vercel IPs or use 0.0.0.0/0
4. Add DATABASE_URL to Vercel environment variables
5. Deploy and run `npx prisma db push`

### Environment Variables in Vercel
```
DATABASE_URL=mongodb+srv://prod_user:prod_password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret
OPENAI_API_KEY=your-openai-key
```

---

## Monitoring & Maintenance

### MongoDB Atlas Metrics
- **Performance**: Query execution times
- **Operations**: Read/write operations per second
- **Connections**: Active connections
- **Storage**: Database size

Access at: Atlas Dashboard → Metrics tab

### Prisma Studio
```bash
npx prisma studio
```
Visual interface to:
- View all data
- Add/edit/delete records
- Test queries

---

## Resources

- **MongoDB Atlas**: [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- **Documentation**: [mongodb.com/docs](https://www.mongodb.com/docs/)
- **Prisma + MongoDB**: [prisma.io/docs/concepts/database-connectors/mongodb](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- **Community**: [community.mongodb.com](https://www.mongodb.com/community/forums/)

---

## Quick Command Reference

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio
npx prisma studio

# View schema in browser
npx prisma format

# Reset database (CAUTION: deletes all data)
npx prisma db push --force-reset
```

---

## Need Help?

1. Check MongoDB Atlas connection string format
2. Verify IP whitelist (0.0.0.0/0 for development)
3. Ensure username/password are correct
4. Run `npx prisma db push` to test connection
5. Check [QUICKSTART.md](QUICKSTART.md) for more details

---

**You're all set with MongoDB!** 🎉

The application is now configured to use MongoDB instead of PostgreSQL. Follow the steps above to get your database running.
