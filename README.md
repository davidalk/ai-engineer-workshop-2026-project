# Cadence — Course Platform

A full-stack course platform (think a mini Udemy) built with React Router, TypeScript, SQLite, and Drizzle ORM. Used as the project for an AI-assisted development workshop.

## Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [pnpm](https://pnpm.io/) v9+ (enabled via `corepack enable`)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed
- A Claude Pro or Max subscription

## Getting Started

```bash
# Install dependencies
pnpm install

# Run database migrations and seed data
pnpm db:migrate
pnpm db:seed

# Start the dev server
pnpm dev
```

The app will be running at `http://localhost:5173`.

See `client-brief.md` for the starting point and project context.

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Start the development server |
| `pnpm build`     | Build for production         |
| `pnpm test`      | Run tests with Vitest        |
| `pnpm typecheck` | Type-check the project       |
| `pnpm db:migrate`| Run database migrations      |
| `pnpm db:seed`   | Seed the database            |

## Tech Stack

- **Framework:** [React Router](https://reactrouter.com/) v7 with SSR
- **Language:** TypeScript
- **Database:** SQLite via [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Build:** [Vite](https://vite.dev/)
