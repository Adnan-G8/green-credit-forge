# FAGRI Digital Platform

## Overview

FAGRI Digital is a modern web application built for agricultural digitalization and climate responsibility. It serves as a digital platform for the Italian agricultural movement FAGRI, featuring a comprehensive landing page with contact forms, membership applications, and multi-language support. The application follows a full-stack architecture with a React frontend and Express.js backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (July 19, 2025)

- **Complete Design Overhaul**: Redesigned entire website with banking-style professional aesthetics
- **Clean Typography**: Implemented light font weights, proper hierarchy, and minimal styling
- **Professional Layout**: Clean sections with slate/white color scheme and subtle borders
- **Trust-Focused Design**: Emphasis on credibility and professional appearance for CO2 certification platform
- **Simplified Navigation**: Clean navigation bar with consistent emerald accent colors
- **Removed Creative Elements**: Eliminated colorful gradients and complex animations in favor of clean, minimal design
- **Banking-Style Buttons**: Professional button styling with subtle shadows and clean rounded corners
- **Fixed Protocol Name**: Corrected all instances from "EUP02025-001" to "EUFD2025-001" throughout website
- **Enhanced Language System**: Improved Italian/English switching with better fallback handling
- **Eliminated Duplicate Content**: Replaced duplicate statistics sections with unique process flow design
- **Added Company Information**: Integrated official Fagri Digital S.r.l. legal details and contact information
- **Fixed Bilingual Functionality**: Resolved all hardcoded Italian text issues across all website sections
- **Added EUFD Standard Subpage**: Created dedicated /eufd-standard page with comprehensive EUFD2025-001 information
- **Read More Functionality**: Added "Read More" button in standard section linking to detailed subpage
- **ALPHAG8 Partnership Details**: Enhanced content to highlight Swiss technology partnership and blockchain architecture
- **Complete Legal Compliance Framework**: Created comprehensive legal pages (Privacy Policy, Terms & Conditions, GDPR, Cookie Policy) in both languages
- **Security Trust Integration**: Added prominent security notices to all legal pages highlighting Swiss banking-level data protection
- **Navigation Enhancement**: Fixed scroll-to-top functionality for all page navigation with automatic hook implementation
- **Security Visibility**: Enhanced footer security link visibility with lock icon and emerald highlighting to guide users to security information
- **CO2 Certification Subpage**: Created comprehensive dedicated page showcasing certification partnerships, legal framework, and technology stack
- **Enhanced Footer Navigation**: Added CO2 certification link to footer platform section for improved discoverability
- **Removed Generic Partnerships Section**: Eliminated empty "Institutional Partnerships" section from home page since specific partners are already detailed in CO2 certification subpage
- **Updated Footer Partner Links**: Replaced social media icons with ALPHAG8 and g8Chain technology partner links, added "Powered by ALPHAG8 Switzerland" credit
- **Standardized Navigation**: All subpages now use consistent full Navigation component instead of mixed approaches (some had "back" buttons, others full nav)
- **Enhanced User Experience**: Users can now access language switching and full navigation from any page without returning to home first
- **Technology & Institutional Partners Showcase**: Added comprehensive partner section displaying ALPHAG8, G8Chain, EU Commission, Italian Ministry, ISO, and Italian Universities with professional banking-style design
- **Credibility Enhancement**: Partner showcase strengthens platform trustworthiness by highlighting serious technological and institutional backing behind CO₂ certification process

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Component Library**: Radix UI primitives for accessible components
- **State Management**: TanStack Query for server state management
- **Styling**: Modern CSS-in-JS approach with CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the stack
- **API Design**: RESTful API with JSON responses
- **Request Handling**: Express middleware for logging, parsing, and error handling
- **Development Server**: Vite integration for hot module replacement in development

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Connection**: Neon serverless driver for PostgreSQL connections

## Key Components

### Frontend Components
- **Navigation**: Fixed navigation with smooth scrolling and language switching
- **Landing Sections**: Hero, Introduction, Standard, Partnerships, Platform, Security, Mission, Contact
- **Forms**: Contact form and membership application modal with validation
- **Language System**: Complete internationalization support (Italian/English)
- **UI Library**: Comprehensive component library based on shadcn/ui and Radix UI

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **API Routes**: Contact form and membership application endpoints
- **Validation**: Zod schema validation for all form submissions
- **Development Tools**: Request logging and error handling middleware

### Shared Resources
- **Schema**: Centralized Drizzle schema definitions for users, contacts, and memberships
- **Types**: Shared TypeScript types between frontend and backend
- **Validation**: Zod schemas for runtime type checking and validation

## Data Flow

### Form Submissions
1. User fills out contact or membership forms in the frontend
2. Form data is validated client-side using Zod schemas
3. Data is sent via POST requests to backend API endpoints
4. Backend validates data again using the same Zod schemas
5. Validated data is stored using the storage abstraction layer
6. Success/error responses are returned to the frontend
7. Toast notifications inform users of submission status

### Language Management
1. Language preference is stored in localStorage
2. Context provider manages current language state
3. Translation function looks up keys in translation objects
4. Language selection affects form submissions and API calls

### Navigation and Routing
1. Single-page application with smooth scrolling navigation
2. Wouter handles client-side routing for different pages
3. Navigation state management for mobile responsiveness

## External Dependencies

### Core Framework Dependencies
- React 18 ecosystem (react, react-dom, @types/react)
- Vite build tooling with React plugin
- Express.js for backend server
- Drizzle ORM with PostgreSQL driver

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI components for accessibility
- Lucide React for consistent iconography
- Class Variance Authority for component variants

### Data Management
- TanStack Query for server state and caching
- Zod for schema validation and type safety
- React Hook Form with Zod resolvers

### Development Tools
- TypeScript for type safety across the stack
- ESBuild for production bundling
- PostCSS with Autoprefixer for CSS processing

## Deployment Strategy

### Build Process
1. Frontend builds with Vite to `dist/public` directory
2. Backend builds with ESBuild to `dist` directory as ESM modules
3. Shared schema and types are included in both builds
4. Production build excludes development-only dependencies

### Environment Configuration
- Database URL required for PostgreSQL connection
- Drizzle migrations stored in `./migrations` directory
- Development mode includes Vite dev server integration
- Production serves static files from Express

### Hosting Requirements
- Node.js runtime for Express server
- PostgreSQL database (configured for Neon serverless)
- Static file serving capability for frontend assets
- Environment variable support for DATABASE_URL

### Development vs Production
- Development: Vite dev server with HMR, memory storage fallback
- Production: Compiled Express server, PostgreSQL database, static asset serving
- Shared configuration through environment variables and build scripts