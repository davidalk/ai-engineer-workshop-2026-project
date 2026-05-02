# Gamification Tracer Bullet

## Overview
Smallest end-to-end slice of the gamification feature: award points on lesson completion, display total points on dashboard and sidebar.

## Context
From client brief (Sarah Chen, VP Product):
- Add points system, levels/ranks, streaks, quiz integration
- No leaderboards or competitive elements
- Keep it private to each student

This tracer bullet validates: DB schema → service layer → UI integration.

## Decisions Made

### Scope
- **Tracer bullet:** Points on lesson completion + display on dashboard & sidebar
- **Points value:** 10 points per lesson completion
- **Skip duplicate awards:** Don't award points if lesson already completed

### Database Schema
- **Add to `app/db/schema.ts`** (not separate file)
- **`userGamification` table:**
  - `userId` (integer, PK, FK → users.id)
  - `totalPoints` (integer, not null, default 0)
  - `lastActivityDate` (text, nullable)
- **`pointsHistory` table:**
  - `id` (integer, PK, autoIncrement)
  - `userId` (integer, FK → users.id)
  - `points` (integer, not null)
  - `reason` (text, not null) — e.g., "lesson_complete"
  - `relatedEntityType` (text) — e.g., "lesson"
  - `relatedEntityId` (integer)
  - `createdAt` (text, default now)
- **Migration:** Generate proper Drizzle migration (`npm run db:generate` + `npm run db:migrate`)

### Service Layer
- **Create `app/services/gamificationService.ts`**
- **Functions exposed:**
  - `awardPoints(tx, userId, points, reason, entityType, entityId)` — upserts userGamification, increments totalPoints via SQL, updates lastActivityDate, inserts pointsHistory record
  - `getUserGamification(userId)` — returns `{ totalPoints, lastActivityDate }`, defaults to `{ totalPoints: 0, lastActivityDate: null }` for new users
- **Integration:** Modify `markLessonComplete` in `progressService.ts` to:
  - Manage transaction internally (`db.transaction()`)
  - Check if lesson already completed, skip if so
  - Call `awardPoints(tx, userId, 10, "lesson_complete", "lesson", lessonId)` inside transaction

### UI Integration
- **Sidebar (`components/sidebar.tsx`):** Display "X points" as subtle text (muted color, smaller font) next to user name
- **Dashboard (`app/routes/dashboard.tsx`):** Append points to existing subtitle — "Track your learning progress — X points"

### Testing
- **TDD approach:** Write tests first
- **Test file:** `app/services/gamificationService.test.ts` (co-located with service)
- **Test cases:**
  - `awardPoints`: upserts userGamification, increments totalPoints, creates pointsHistory, updates lastActivityDate
  - `getUserGamification`: returns default for new users, returns data for existing users
  - `markLessonComplete` integration: awards points on first completion, skips on repeat completion

## Implementation Steps
1. Add `userGamification` and `pointsHistory` tables to `app/db/schema.ts`
2. Run `npm run db:generate` and `npm run db:migrate`
3. Create `app/services/gamificationService.test.ts` (tests first)
4. Create `app/services/gamificationService.ts`
5. Modify `markLessonComplete` in `progressService.ts` to award points
6. Update sidebar to display points
7. Update dashboard to display points
8. Run `npm run test` and `npm run typecheck`
9. Commit

## Files Changed
- `app/db/schema.ts` — new tables
- `drizzle/` — migration files (generated)
- `app/services/gamificationService.ts` — new file
- `app/services/gamificationService.test.ts` — new file
- `app/services/progressService.ts` — modify `markLessonComplete`
- `components/sidebar.tsx` — display points
- `app/routes/dashboard.tsx` — display points

## Next Steps (Post-Tracer Bullet)
- Add levels calculation (based on totalPoints)
- Add streaks (using lastActivityDate)
- Add quiz point awards
- Add achievements/badges
- Add gamification dashboard page
