# Cadence — Course Platform

A full-stack course platform (think a mini Udemy) built with React Router, TypeScript, SQLite, and Drizzle ORM. Used as the project for an AI-assisted development workshop.

## Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [npm](https://www.npmjs.com/) v10+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed
- A Claude Pro or Max subscription

## Getting Started

```bash
# Install dependencies
npm install

# Run database migrations and seed data
npm run db:migrate
npm run db:seed

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

See `client-brief.md` for the starting point and project context.

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `npm run dev`        | Start the development server |
| `npm run build`      | Build for production         |
| `npm test`           | Run tests with Vitest        |
| `npm run typecheck`  | Type-check the project       |
| `npm run db:migrate` | Run database migrations      |
| `npm run db:seed`    | Seed the database            |

## Tech Stack

- **Framework:** [React Router](https://reactrouter.com/) v7 with SSR
- **Language:** TypeScript
- **Database:** SQLite via [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Build:** [Vite](https://vite.dev/)
