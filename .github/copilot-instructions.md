# Copilot Instructions for Zeydra9-Web

## Project Overview
- **Zeydra9-Web** is a full-stack, TypeScript-based web application with a sci-fi NFT theme.
- The project is organized into `client/` (frontend), `server/` (backend), and `shared/` (shared types/schemas).
- Uses Vite for frontend build, Drizzle ORM for database, and Tailwind CSS for styling.

## Architecture & Data Flow
- **Frontend** (`client/`):
  - Built with React (TypeScript, see `src/`).
  - UI components are in `src/components/` and `src/components/ui/`.
  - Pages are in `src/pages/` (e.g., `home.tsx`).
  - Hooks and utility functions are in `src/hooks/` and `src/lib/`.
- **Backend** (`server/`):
  - Entry point: `server/index.ts`.
  - Database logic: `server/db.ts` (uses Drizzle ORM, config in `drizzle.config.ts`).
  - API routes: `server/routes.ts`.
  - Storage and Vite server logic: `server/storage.ts`, `server/vite.ts`.
- **Shared Types**: `shared/schema.ts` defines database schema and types shared between client and server.

## Developer Workflows
- **Install dependencies:**
  ```bash
  npm install
  ```
- **Build frontend:**
  ```bash
  npm run build
  ```
- **Start development server:**
  ```bash
  npm run dev
  ```
- **Seed database:**
  ```bash
  node scripts/seed-database.ts
  ```
- **Drizzle ORM migrations:**
  - Configured in `drizzle.config.ts`.
  - Use Drizzle CLI for schema/migration tasks.

## Project Conventions
- **TypeScript everywhere** (client, server, shared).
- **Component-first UI**: All UI elements are React components, often composed from `src/components/ui/`.
- **Tailwind CSS**: Styling is utility-first, configured in `tailwind.config.ts`.
- **Solana integration**: Wallet and blockchain logic in `client/src/lib/solana.ts` and related hooks/components.
- **No direct DB access from client**: All DB access is via server API routes.

## Integration Points
- **Solana blockchain**: See `client/src/lib/solana.ts` and wallet components.
- **Drizzle ORM**: Used for all DB access, schema in `shared/schema.ts`.
- **Vite**: Used for both frontend and server builds.

## Examples
- To add a new NFT feature, update `shared/schema.ts`, backend logic in `server/`, and UI in `client/src/components/`.
- For new UI patterns, create components in `client/src/components/ui/` and compose them in pages/components.

---

If any section is unclear or missing, please provide feedback for further refinement.
