# Blogging Website

A full-stack blogging platform inspired by Medium, built with modern web technologies.

## 🚀 Features

- **User Authentication**: Secure JWT-based sign-up and sign-in functionality
- **Blog Management**: Create, read, post blogs.
- **User Dashboard**: Displays all blogs
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Performance**: Optimized with Prisma Accelerate for fast database queries

## 🛠️ Tech Stack

### Frontend
- **Vite** - Fast build tool and development server
- **React** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript

### Backend
- **Cloudflare Workers** - Serverless backend runtime
- **Prisma** - Database ORM with Accelerate for connection pooling
- **PostgreSQL** - Primary database
- **Wrangler** - CLI for Cloudflare Workers development

### Shared
- **Common Package** - Shared types and utilities (published to NPM)

## 📁 Project Structure

```
medium-clone/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── ...
│   │   ├── components/
│   │   │   ├── Auth.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── ...
│   │   ├── recoil/
│   │   │   ├── ...
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Cloudflare Workers backend
│   ├── src/
│   ├── wrangler.jsonc
│   ├── package.json
│   └── ...
├── common/           # Shared types and utilities
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL database
- Cloudflare Workers account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ParateAditya/medium.git
   cd medium
   ```

2. **Install dependencies for all packages**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Install common package dependencies
   cd ../common
   npm install
   ```

3. **Set up environment variables**

   **Backend (.env)**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/medium_clone"
   ```

   **Backend (wrangler.jsonc)**
   ```json
   {
     "name": "medium-clone-backend",
     "main": "src/index.ts",
     "compatibility_date": "2024-01-01",
     "vars": {
       "DATABASE_URL": "your-prisma-accelerate-url",
       "JWT_SECRET" : "unknown-secret"
     }
   }
   ```

4. **Set up the database**
   ```bash
   cd backend
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Build and publish the common package** (if making changes)
   ```bash
   cd common
   npm run build
   npm publish
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8787`

## 📱 Pages

- **Sign In** (`/signin`) - User authentication
- **Sign Up** (`/signup`) - New user registration
- **Dashboard** (`/dashboard`) - User's personal blog management
- **Blog Post** (`/blog/:id`) - Individual blog post view

## 🔧 Configuration

### Prisma Accelerate

This project uses Prisma Accelerate for enhanced database performance. Make sure to:

1. Set up your Prisma Accelerate connection
2. Add the `PRISMA_ACCELERATE_URL` to your `wrangler.jsonc`
3. Configure connection pooling as needed

### Cloudflare Workers

The backend is deployed on Cloudflare Workers for serverless scalability:

```bash
# Deploy to Cloudflare Workers
cd backend
npm run deploy
```

## 📦 Common Package

The `common` folder contains shared TypeScript types and utilities used across both frontend and backend. It's published as an NPM package for easy import and version management.

To update the common package:
```bash
cd common
npm version patch  # or minor/major
npm run build
npm publish
```

## 🚀 Deployment

### Frontend 
```bash
cd frontend
npm run build
# Deploy dist folder to your preferred hosting platform
```

### Backend (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

## 🙏 Acknowledgments

- Inspired by Medium's clean and user-friendly interface
- Built with modern web technologies for optimal performance
- Uses Prisma Accelerate for enhanced database performance

---

**Made with ❤️ by [ParateAditya](https://github.com/ParateAditya)**
