import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quotaDaily = sqliteTable(
  "quota_daily",
  {
    day: text("day").notNull(),
    actorHash: text("actor_hash").notNull(),
    attempts: integer("attempts").notNull().default(0),
    successes: integer("successes").notNull().default(0),
    blocked: integer("blocked").notNull().default(0),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.day, table.actorHash] })],
);

export const runReceipts = sqliteTable("run_receipts", {
  id: text("id").primaryKey(),
  day: text("day").notNull(),
  actorHash: text("actor_hash").notNull(),
  inputHash: text("input_hash").notNull(),
  model: text("model").notNull(),
  status: text("status").notNull(),
  latencyMs: integer("latency_ms").notNull(),
  createdAt: text("created_at").notNull(),
});
