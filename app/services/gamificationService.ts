import { eq, sql } from "drizzle-orm";
import { db } from "~/db";
import { userGamification, pointsHistory } from "~/db/schema";

export interface UserGamification {
  totalPoints: number;
  lastActivityDate: string | null;
}

export function getUserGamification(userId: number): UserGamification {
  const record = db
    .select()
    .from(userGamification)
    .where(eq(userGamification.userId, userId))
    .get();

  if (!record) {
    return { totalPoints: 0, lastActivityDate: null };
  }

  return {
    totalPoints: record.totalPoints,
    lastActivityDate: record.lastActivityDate,
  };
}

export function awardPoints(
  tx: any,
  userId: number,
  points: number,
  reason: string,
  relatedEntityType?: string,
  relatedEntityId?: number
) {
  const now = new Date().toISOString();

  tx.insert(userGamification)
    .values({
      userId,
      totalPoints: points,
      lastActivityDate: now,
    })
    .onConflictDoUpdate({
      target: userGamification.userId,
      set: {
        totalPoints: sql`${userGamification.totalPoints} + ${points}`,
        lastActivityDate: now,
      },
    })
    .run();

  tx.insert(pointsHistory)
    .values({
      userId,
      points,
      reason,
      relatedEntityType,
      relatedEntityId,
      createdAt: now,
    })
    .run();
}
