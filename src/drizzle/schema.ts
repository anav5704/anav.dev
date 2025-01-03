import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core"

export const Subscription = pgTable("subscription", {
    email: varchar("email", { length: 255 }).primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})