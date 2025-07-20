# FAGRI Digital Platform - Developer Onboarding Guide

## 📋 Project Overview

FAGRI Digital is a sophisticated, bilingual (Italian/English) web platform for CO₂ certification in the agricultural sector. Built with modern web technologies and banking-level design standards, it serves as the digital gateway for the Italian agricultural movement FAGRI, featuring blockchain integration, advanced security protocols, and comprehensive certification management.

### Core Mission
Revolutionizing CO₂ certification processes for agricultural enterprises through blockchain technology, strategic partnerships, and advanced digital infrastructure.

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development + optimized production builds)
- **Routing**: Wouter (lightweight client-side routing)
- **UI Framework**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React + React Icons
- **Styling**: Modern CSS with CSS variables for theming

### Backend Stack
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript throughout
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas for type safety
- **API Design**: RESTful endpoints with JSON responses

### Development Environment
- **Platform**: Replit (all development and deployment)
- **Hot Reloading**: Vite dev server with HMR
- **Package Management**: npm
- **TypeScript**: Strict type checking enabled

## 📁 Project Structure

```
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── lib/             # Utilities and configurations
│   │   └── hooks/           # Custom React hooks
├── server/                   # Backend Express application
│   ├── routes.ts            # API endpoint definitions
│   ├── storage.ts           # Data storage abstraction
│   └── index.ts             # Server entry point
├── shared/                   # Shared types and schemas
│   └── schema.ts            # Drizzle database schemas
└── Configuration files (package.json, vite.config.ts, etc.)
```

## 🌐 Key Features & Pages

### Main Website Sections
1. **Hero Section**: Professional landing with key metrics and CTAs
2. **Introduction Section**: Platform overview and value proposition  
3. **Standard Section**: EUFD2025-001 protocol details
4. **Platform Section**: Digital certification process walkthrough
5. **Renewable Energy Section**: Sustainability partnerships
6. **Contact Section**: Lead generation and inquiries

### Dedicated Pages
- `/eufd-standard` - Comprehensive EUFD2025-001 information
- `/co2-certification` - Certification partnerships and technology
- `/security` - Security infrastructure details
- `/privacy-policy` - GDPR compliance and data protection
- `/terms-of-service` - Legal terms and conditions
- `/cookies` - Cookie policy and preferences
- `/gdpr` - GDPR information and rights

### Interactive Features
- **Language Switching**: Complete Italian/English localization
- **Membership Modal**: Application form for network joining
- **Contact Forms**: Lead generation with validation
- **Responsive Navigation**: Mobile-optimized menu system

## 🔧 Development Workflow

### Getting Started
1. **Environment**: Development happens entirely on Replit
2. **Workflow**: Use "Start application" workflow (runs `npm run dev`)
3. **Hot Reloading**: Changes reflect immediately via Vite HMR
4. **Debugging**: Browser dev tools + server logs in Replit console

### Code Style & Standards
- **TypeScript**: Strict typing throughout the application
- **Component Structure**: Functional components with hooks
- **Styling**: Tailwind utility classes with component variants
- **Naming**: Clear, descriptive names following React conventions
- **File Organization**: Group by feature, separate concerns

### Database Development
- **ORM**: Drizzle ORM for type-safe database operations
- **Schemas**: Centralized in `shared/schema.ts`
- **Migrations**: Managed through Drizzle Kit
- **Storage**: Abstracted interface in `server/storage.ts`

## 🌍 Internationalization System

### Language Management
- **Supported Languages**: Italian (primary), English
- **Translation Files**: Centralized in `client/src/lib/translations.ts`
- **Context Provider**: Language state managed globally
- **Fallback Handling**: Graceful degradation for missing translations
- **Storage**: User preference saved in localStorage

### Adding New Translations
1. Add key-value pairs to both `it` and `en` objects in translations.ts
2. Use the `t()` function in components: `{t('translation-key')}`
3. Follow naming convention: `section-element-descriptor`

## 🔐 Security & Compliance

### Data Protection Architecture
- **Swiss Banking Environment**: Sensitive data (PII, financial)
- **Global Distribution**: Non-sensitive data for performance
- **3FA Authentication**: Three-factor security model
- **GDPR Compliance**: Full European data protection compliance
- **Blockchain Integration**: ALPHAG8 and G8Chain technology

### Security Features
- **Data Classification**: Multi-tier security based on sensitivity
- **Hardware Security**: Industry-leading data center standards
- **Encryption**: End-to-end protection for sensitive information
- **Audit Trail**: Complete traceability for all operations

## 🤝 Key Partnerships

### Technology Partners
- **ALPHAG8 Digital Solutions Switzerland**: Blockchain infrastructure
- **G8Chain**: Federated Enterprise Blockchain technology

### Institutional Partners
- **European Commission**: Regulatory compliance and standards
- **Italian Ministry**: National agricultural policy alignment
- **ISO/UNI**: International and national standards certification
- **SUOLO E SALUTE**: Organic certification partnership
- **Italian Universities**: Research and development collaboration

## 📊 Platform Metrics & Standards

### Key Statistics
- **110,000+ Members**: Agricultural network participants
- **EUFD2025-001**: EU standard for CO₂ certification
- **€2.4B+ Carbon Credit Value**: Market impact and scale

### Technical Standards
- **ISO 14064**: Carbon accounting and verification
- **EUFD2025-001**: European framework for digital certification
- **GDPR Compliance**: European data protection standards
- **Swiss Banking Standards**: Data security and protection

## 🛠️ Common Development Tasks

### Adding New Components
1. Create component file in `client/src/components/`
2. Import and use shadcn/ui components where possible
3. Add TypeScript interfaces for props
4. Follow responsive design patterns
5. Add translations if needed

### Adding New Pages
1. Create page component in `client/src/pages/`
2. Add route to `client/src/App.tsx`
3. Update navigation in `client/src/components/navigation.tsx`
4. Add page-specific translations
5. Implement SEO meta tags

### Database Schema Changes
1. Modify schemas in `shared/schema.ts`
2. Update storage interface in `server/storage.ts`
3. Add API endpoints in `server/routes.ts`
4. Update frontend queries and mutations
5. Test data flow end-to-end

### Styling Guidelines
- **Colors**: Use CSS variables defined in `index.css`
- **Typography**: Professional, banking-style typography hierarchy
- **Spacing**: Consistent Tailwind spacing utilities
- **Responsive**: Mobile-first responsive design
- **Accessibility**: ARIA labels and semantic HTML

## 🚀 Deployment & Production

### Build Process
- **Frontend**: Vite builds to `dist/public`
- **Backend**: ESBuild compiles to `dist`
- **Assets**: Static files served by Express in production
- **Environment**: Production deployment through Replit

### Environment Variables
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment setting (development/production)
- **PORT**: Server port configuration

## 📝 Important Notes for New Developers

### Platform-Specific Considerations
- **Replit Environment**: All development happens on Replit platform
- **No Docker/Containers**: Use Replit's native environment
- **Package Management**: Use packager tool, not direct npm commands
- **File Paths**: Relative paths from root, no absolute paths

### Design Philosophy
- **Banking-Style Aesthetics**: Professional, credible, trustworthy
- **Clean Typography**: Light font weights, proper hierarchy
- **Minimal Design**: Avoid colorful gradients, focus on content
- **Professional Trust**: Emphasis on credibility and security

### Code Quality Standards
- **Type Safety**: Leverage TypeScript throughout
- **Error Handling**: Graceful error states and user feedback
- **Performance**: Optimize for fast loading and smooth interactions
- **Accessibility**: Ensure inclusive design practices

## 🔍 Debugging & Troubleshooting

### Common Issues
- **Hot Reload Problems**: Check Vite configuration and imports
- **Translation Errors**: Verify key exists in both language objects
- **Database Issues**: Check connection string and schema sync
- **Build Errors**: Review TypeScript errors and dependency issues

### Useful Tools
- **Browser DevTools**: React DevTools, Network tab, Console
- **Replit Console**: Server logs and build output
- **TypeScript**: Built-in type checking and IntelliSense
- **Vite DevTools**: Hot reload status and module graph

## 📚 Learning Resources

### Framework Documentation
- [React 18](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://drizzle.team)
- [shadcn/ui](https://ui.shadcn.com)

### Platform-Specific
- [Replit Documentation](https://docs.replit.com)
- [Vite Guide](https://vitejs.dev/guide)
- [TanStack Query](https://tanstack.com/query)

---

**Welcome to the FAGRI Digital development team!** This platform represents the cutting edge of agricultural technology and blockchain innovation. Focus on maintaining the professional, banking-level quality that establishes trust with our users while building features that genuinely serve the agricultural community.

For questions or clarification on any aspect of the platform, refer to the `replit.md` file for the most current project status and recent changes.