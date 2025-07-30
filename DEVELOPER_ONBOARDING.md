# FAGRI DIGITAL - Developer Setup Guide

## 📥 How to Get the Complete Code Package

Since Replit files cannot be downloaded directly, here are **3 ways** to access the complete FAGRI Digital code:

### **Option 1: Copy Files Manually (Recommended)**
1. **View each file** in Replit's file explorer
2. **Copy the content** of each component you need
3. **Create new files** in your local development environment
4. **Follow the Installation Instructions** below

### **Option 2: GitHub Export**
1. Connect this Replit to **GitHub** (if available)
2. **Push to repository**
3. **Clone repository** to your local machine
4. **Run installation steps**

### **Option 3: ZIP Download**
1. In Replit, go to **Tools** → **Download as ZIP**
2. **Extract the ZIP** file to your development directory
3. **Follow Installation Instructions**

---

## 🚀 Complete Installation Instructions

### **Prerequisites**
- **Node.js 18+** installed on your system
- **PostgreSQL database** (or Neon serverless)
- **Git** (for version control)
- **Code editor** (VS Code recommended)

### **Step 1: Project Setup**
```bash
# Create project directory
mkdir fagri-digital
cd fagri-digital

# Initialize Node.js project
npm init -y

# Install core dependencies
npm install react react-dom @types/react @types/react-dom
npm install typescript @vitejs/plugin-react vite
npm install express @types/express @types/node
npm install wouter @tanstack/react-query
npm install tailwindcss autoprefixer postcss
npm install lucide-react class-variance-authority clsx
npm install drizzle-orm @neondatabase/serverless
npm install zod drizzle-zod
```

### **Step 2: Project Structure**
Create this exact folder structure:
```
fagri-digital/
├── client/
│   └── src/
│       ├── components/
│       │   ├── ui/
│       │   ├── navigation.tsx
│       │   ├── footer.tsx
│       │   └── language-provider.tsx
│       ├── pages/
│       │   ├── dashboard.tsx
│       │   ├── security.tsx
│       │   └── home.tsx
│       ├── hooks/
│       │   └── use-authentication.ts
│       ├── lib/
│       │   └── translations.ts
│       ├── assets/
│       └── App.tsx
├── server/
│   ├── index.ts
│   └── routes.ts
├── shared/
│   └── schema.ts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### **Step 3: Configuration Files**

**package.json** - Add these scripts:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "client": "vite",
    "server": "tsx server/index.ts",
    "build": "vite build",
    "db:push": "drizzle-kit push:pg"
  }
}
```

**vite.config.ts**:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
```

**tailwind.config.ts**:
```typescript
import { Config } from "tailwindcss";

const config: Config = {
  content: ['./client/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
          900: '#064e3b',
        }
      }
    }
  },
  plugins: []
};

export default config;
```

### **Step 4: Environment Variables**
Create `.env` file:
```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
PORT=5000
```

### **Step 5: Copy Core Components**

**Use the code from DEPLOYMENT_PACKAGE_1.md** to create:
- `client/src/hooks/use-authentication.ts`
- `client/src/components/language-provider.tsx`
- `client/src/pages/dashboard.tsx`

**Key Components to Create:**
1. **Authentication System** - Complete session management
2. **Language Provider** - Italian/English bilingual support
3. **Dashboard** - Project tracking with authentication
4. **Security Page** - ALPHAG8 ID KEY documentation
5. **Navigation** - Responsive navigation with language switching

### **Step 6: Start Development**
```bash
# Install all dependencies
npm install

# Start development servers
npm run dev

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

### **Step 7: Test Authentication**
1. **Password**: `CO2FAGRI2025`
2. **Dashboard Test Account**: `FAGRI-TEST001-TEST001-T1`
3. **Verify bilingual switching** works (Italian ↔ English)

---

## 🔧 Key Features Implemented

### ✅ **Dual Authentication System**
- App-level password protection (`CO2FAGRI2025`)
- Dashboard ALPHAG8 ID authentication
- 10-minute session timeout with activity tracking

### ✅ **Complete Bilingual Support**
- Italian (default) + English
- Context-aware translations
- Language persistence in localStorage

### ✅ **Professional Banking Design**
- Clean typography with light font weights
- Emerald and slate color scheme
- Agricultural landscape backgrounds
- Mobile-responsive layouts

### ✅ **Dashboard Functionality**
- Project tracking with CO₂ calculations
- Test data with sample renewable energy projects
- Authentication-protected access
- Professional statistics display

### ✅ **Security Architecture**
- ALPHAG8 ID KEY system documentation
- Alpine data center infrastructure
- Blockchain integration descriptions
- Swiss banking-level security messaging

---

## 📋 Test Accounts & Passwords

### **Main Access**
- **Password Protection**: `CO2FAGRI2025`

### **Dashboard Authentication**
- **Test Account**: `FAGRI-TEST001-TEST001-T1`
- **Admin Account**: `FAGRI-2MKQW8X9-PLVNR4T6-A2`
- **Sales Team**: `FAGRI-5ZXCV9L4-ASDFGH34-C1`

### **Sample Projects**
1. **Renewable Energy Farm - Tuscany** (450 tons CO₂)
2. **Sustainable Agriculture - Emilia** (320 tons CO₂)
3. **Forest Carbon Project - Umbria** (680 tons CO₂)

---

## 🎯 Deployment Options

### **Development**
```bash
npm run dev  # Start local development
```

### **Production Build**
```bash
npm run build  # Create production build
npm start      # Start production server
```

### **Database Setup**
```bash
npm run db:push  # Push schema to database
```

---

**Generated: July 30, 2025**  
**Complete FAGRI Digital CO₂ Certification Platform**  
**Bilingual Banking-Style Agricultural Technology Solution**