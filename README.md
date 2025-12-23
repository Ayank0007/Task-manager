# Task Manager Pro 🚀

A full-stack, secure, and user-friendly CRUD application built with Next.js 16, featuring AI-powered task suggestions, robust authentication, and intuitive task organization.

## 🌟 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks with comprehensive validation
- **AI-Powered Suggestions**: Get intelligent suggestions for task descriptions, priorities, and tags using OpenAI
- **Secure Authentication**: JWT-based authentication with NextAuth.js
- **Task Organization**: Filter and organize tasks by status, priority, due date, and tags
- **Responsive Design**: Beautiful, accessible UI built with Tailwind CSS and shadcn/ui components
- **Real-time Statistics**: Dashboard with task completion statistics
- **Type-Safe**: Built with TypeScript for enhanced code quality and maintainability

## 🛠️ Technology Stack

### Backend/Frontend
- **Next.js 16** (App Router)
- **TypeScript** for type safety
- **NextAuth.js** for authentication
- **Prisma ORM** for database management

### Database
- **MongoDB** with Prisma ORM

### UI/Styling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Radix UI** for accessible component primitives

### AI Integration
- **Vercel AI SDK** for AI-powered features
- **OpenAI API** for intelligent suggestions

### Validation & Security
- **Zod** for schema validation
- **bcryptjs** for password hashing
- **JWT** for secure token-based authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later
- MongoDB database (MongoDB Atlas account recommended for free cloud hosting)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory (use `.env.example` as reference):

```env
# Database URL for MongoDB
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# AI API Keys (Optional - for AI features)
OPENAI_API_KEY="your-openai-api-key-here"
```

**Important**: 
- For MongoDB Atlas (recommended): Create a free cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) and get your connection string
- For local MongoDB: Use `mongodb://localhost:27017/taskmanagement`
- Generate a secure `NEXTAUTH_SECRET` using: `openssl rand -base64 32`
- Add your OpenAI API key to enable AI suggestions (optional)

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view your database
npx prisma studio
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
task-management-app/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── tasks/           # Task CRUD endpoints
│   │   ├── register/        # User registration
│   │   └── ai/              # AI suggestion endpoints
│   ├── dashboard/           # Main dashboard page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── TaskForm.tsx         # Task creation/edit form
│   ├── TaskCard.tsx         # Task display card
│   ├── LoginForm.tsx        # Login form
│   ├── RegisterForm.tsx     # Registration form
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer with links
│   └── AuthProvider.tsx     # Auth context provider
├── lib/                     # Utility libraries
│   ├── auth.ts              # NextAuth configuration
│   ├── prisma.ts            # Prisma client
│   ├── validations.ts       # Zod schemas
│   └── utils.ts             # Utility functions
├── prisma/                  # Database schema & migrations
│   └── schema.prisma        # Prisma schema
└── public/                  # Static assets
```

## 🔑 Key Features Implementation

### Authentication & Authorization

- **Registration**: New users can create accounts with email/password
- **Login**: Secure authentication using NextAuth.js with JWT strategy
- **Session Management**: Persistent sessions with automatic token refresh
- **Protected Routes**: Dashboard and API routes require authentication

### Task Management (CRUD)

**Create**:
- Rich task creation form with validation
- AI-powered suggestions for descriptions and priorities
- Support for tags, due dates, and priority levels

**Read**:
- View all tasks in a responsive grid layout
- Filter tasks by status (To Do, In Progress, Completed)
- Filter tasks by priority (Low, Medium, High)
- Real-time statistics dashboard

**Update**:
- Inline editing of tasks
- All fields can be modified
- Validation ensures data integrity

**Delete**:
- Confirmation dialog before deletion
- Cascade deletion of related data

### AI Features

The application includes AI-powered task suggestions:
- **Smart Descriptions**: Generate detailed descriptions based on task titles
- **Priority Recommendations**: AI suggests appropriate priority levels
- **Tag Suggestions**: Automatically generate relevant tags
- **Action Items**: Break down tasks into actionable subtasks

To use AI features:
1. Add your OpenAI API key to `.env`
2. Click "✨ AI Suggest" when creating/editing tasks
3. AI will analyze your task and provide suggestions

### Data Validation

All inputs are validated using Zod schemas:
- **Email**: Must be valid email format
- **Password**: Minimum 6 characters
- **Task Title**: Required, max 200 characters
- **Status**: Must be TODO, IN_PROGRESS, or COMPLETED
- **Priority**: Must be LOW, MEDIUM, or HIGH

### Security Measures

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure session management
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: React's built-in XSS prevention
- **CSRF Protection**: NextAuth.js built-in CSRF tokens
- **Input Sanitization**: Zod validation on all inputs

## 📊 API Endpoints

### Authentication

```
POST /api/register         - Create new user account
POST /api/auth/signin      - Login with credentials
POST /api/auth/signout     - Logout current user
```

### Tasks

```
GET    /api/tasks          - Get all user tasks (with optional filters)
POST   /api/tasks          - Create new task
GET    /api/tasks/:id      - Get single task
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
```

### AI

```
POST /api/ai/suggest       - Get AI suggestions for task
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

```bash
# Using Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables for Production

Ensure these are set in your deployment platform:

```env
DATABASE_URL=your_production_database_url
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secure_secret
OPENAI_API_KEY=your_openai_key
```

### Database Deployment

- **MongoDB Atlas**: Free cloud MongoDB hosting (recommended)
- **Railway**: MongoDB deployment
- **DigitalOcean**: Managed MongoDB
- **AWS DocumentDB**: MongoDB-compatible service

Run migrations in production:
```bash
npx prisma migrate deploy
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration with validation
- [ ] User login with valid/invalid credentials
- [ ] Create task with all fields
- [ ] Edit existing task
- [ ] Delete task with confirmation
- [ ] Filter tasks by status
- [ ] Filter tasks by priority
- [ ] AI suggestions feature
- [ ] Responsive design on mobile
- [ ] Session persistence

### Future Testing Implementation

- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Playwright
- API tests with Supertest

## 🎨 Code Quality & Best Practices

- **TypeScript**: Full type safety across the application
- **ESLint**: Code linting for consistent style
- **Prisma**: Type-safe database access
- **Component Modularity**: Reusable, maintainable components
- **API Structure**: RESTful API design
- **Error Handling**: Comprehensive error handling
- **Loading States**: User feedback for async operations
- **Accessibility**: ARIA labels and semantic HTML

## 🔧 Optimization Techniques

- **Server Components**: Reduced JavaScript bundle size
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Next.js Font optimization
- **Database Indexing**: Optimized Prisma schema indexes
- **Caching**: React Server Components caching

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npx prisma db pull

# Reset database (caution: destroys all data)
npx prisma migrate reset
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Authentication Issues

- Verify `NEXTAUTH_SECRET` is set correctly
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

## 📝 License

This project is built for educational purposes as part of the House of Edtech Full-Stack Developer Assignment.

## 👨‍💻 Developer

**Name**: Ayan Kumar  
**GitHub**: [github.com/ayankumar](https://github.com/ayankumar)  
**LinkedIn**: [linkedin.com/in/ayankumar](https://linkedin.com/in/ayankumar)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the AI SDK
- shadcn for the beautiful UI components
- Prisma team for the excellent ORM

## 📞 Support

For issues or questions, please open an issue on GitHub or contact through LinkedIn.

---

Built with ❤️ using Next.js 16 & AI
