import { describe, it, expect, beforeEach, vi } from "vitest";
import { createTestDb, seedBaseData } from "~/test/setup";
import * as schema from "~/db/schema";

let testDb: ReturnType<typeof createTestDb>;
let base: ReturnType<typeof seedBaseData>;

vi.mock("~/db", () => ({
  get db() {
    return testDb;
  },
}));

import {
  awardPoints,
  getUserGamification,
} from "./gamificationService";

describe("gamificationService", () => {
  beforeEach(() => {
    testDb = createTestDb();
    base = seedBaseData(testDb);
  });

  describe("getUserGamification", () => {
    it("returns default gamification data for new users", () => {
      const result = getUserGamification(base.user.id);

      expect(result).toEqual({
        totalPoints: 0,
        lastActivityDate: null,
      });
    });

    it("returns existing gamification data for users with points", () => {
      testDb.insert(schema.userGamification).values({
        userId: base.user.id,
        totalPoints: 50,
        lastActivityDate: "2026-05-02",
      }).run();

      const result = getUserGamification(base.user.id);

      expect(result).toEqual({
        totalPoints: 50,
        lastActivityDate: "2026-05-02",
      });
    });
  });

  describe("awardPoints", () => {
    it("creates user gamification record and awards points", () => {
      testDb.transaction((tx) => {
        awardPoints(tx, base.user.id, 10, "lesson_complete", "lesson", 1);
      });

      const userGam = testDb.select().from(schema.userGamification).get();
      expect(userGam?.totalPoints).toBe(10);
      expect(userGam?.lastActivityDate).toBeDefined();
    });

    it("increments points on subsequent awards", () => {
      testDb.transaction((tx) => {
        awardPoints(tx, base.user.id, 10, "lesson_complete", "lesson", 1);
        awardPoints(tx, base.user.id, 20, "quiz_pass", "quiz", 1);
      });

      const userGam = testDb.select().from(schema.userGamification).get();
      expect(userGam?.totalPoints).toBe(30);
    });

    it("creates a points history record", () => {
      testDb.transaction((tx) => {
        awardPoints(tx, base.user.id, 10, "lesson_complete", "lesson", 1);
      });

      const history = testDb.select().from(schema.pointsHistory).all();
      expect(history).toHaveLength(1);
      expect(history[0].points).toBe(10);
      expect(history[0].reason).toBe("lesson_complete");
      expect(history[0].relatedEntityType).toBe("lesson");
      expect(history[0].relatedEntityId).toBe(1);
    });

    it("updates lastActivityDate on point award", () => {
      testDb.transaction((tx) => {
        awardPoints(tx, base.user.id, 10, "lesson_complete", "lesson", 1);
      });

      const userGam = testDb.select().from(schema.userGamification).get();
      expect(userGam?.lastActivityDate).toBeDefined();
      expect(new Date(userGam!.lastActivityDate!).getTime()).toBeLessThanOrEqual(Date.now());
    });
  });
});
