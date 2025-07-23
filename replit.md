# Zeydra9 NFT Website - Architecture Documentation

## Overview

This is a full-stack NFT marketplace application showcasing the Zeydra9 NFT collection - a futuristic sci-fi themed collection of 50 extraterrestrial beings. The application features an immersive cosmic design with animated elements, wallet integration, and NFT management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom cosmic theme variables
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Animations**: Framer Motion for smooth animations and transitions
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Style**: RESTful API endpoints

## Key Components

### Frontend Components
1. **Hero Section**: Animated landing area with cosmic elements (spaceship, planets, stars)
2. **Collection Showcase**: NFT gallery with filtering capabilities
3. **Lore Section**: Interactive storytelling with typewriter effects and space ambience controls
4. **Wallet Connector**: Phantom wallet integration for Solana blockchain
5. **Navigation**: Responsive navigation with smooth scrolling
6. **Footer**: Social links and project information (Twitter, Magic Eden)
7. **Space Audio System**: Ambient space sound with floating controls and volume slider

### Backend Components
1. **API Routes**: RESTful endpoints for NFT operations
2. **Storage Layer**: Database storage with PostgreSQL integration via Drizzle ORM
3. **Database Schema**: User and NFT entities with proper relationships and constraints
4. **Database Connection**: Neon serverless PostgreSQL with connection pooling

### Shared Components
1. **Schema Definitions**: Shared TypeScript types and Zod validation schemas
2. **Database Models**: Drizzle ORM schema definitions

## Data Flow

### NFT Management Flow
1. Client requests NFT data through API endpoints
2. Server retrieves data from storage layer
3. Storage layer interfaces with PostgreSQL database
4. Data is returned with proper typing and validation

### Wallet Integration Flow
1. User initiates wallet connection
2. Frontend detects Phantom wallet availability
3. Wallet connection established with user approval
4. Wallet address stored in application state
5. Minting operations can be performed with connected wallet

### UI State Management
1. Server state managed by TanStack Query with caching
2. Local component state managed by React hooks
3. Wallet state managed through custom context provider
4. Toast notifications for user feedback

## External Dependencies

### Blockchain Integration
- **Phantom Wallet**: Solana wallet connection
- **Magic Eden**: NFT marketplace integration (referenced for minting/trading)

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Drizzle Kit**: Database migrations and management
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience

## Deployment Strategy

### Development Environment
- Vite development server with HMR
- Express server with middleware for API routes
- Replit-specific plugins for development experience

### Production Build
- Vite builds optimized client bundle
- esbuild bundles server code for Node.js
- Static files served from Express server
- Database migrations handled by Drizzle Kit

### Database Management
- PostgreSQL database hosted on Neon (serverless)
- Schema management through Drizzle ORM with relations
- Database seeding with 10 Zeydra9 NFTs and placeholder system for remaining 40
- Environment-based database URL configuration with connection pooling
- Real-time NFT data with status tracking (available, minted) and owner information

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared code for easier development and deployment
2. **TypeScript Throughout**: Full type safety from frontend to backend with shared schemas
3. **Cosmic Theme**: Custom CSS variables and Tailwind configuration for consistent sci-fi aesthetic
4. **Component-Based UI**: Reusable components with consistent design system
5. **Responsive Design**: Mobile-first approach with sticky CTAs for mobile users
6. **Wallet Integration**: Phantom wallet focus for Solana ecosystem compatibility
7. **Database Abstraction**: Storage interface allows for easy switching between in-memory and database storage
8. **Environment Configuration**: Flexible configuration for development and production environments