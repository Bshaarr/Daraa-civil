import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, date } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 180 }).notNull(),
  employeeNumber: varchar("employeeNumber", { length: 40 }).notNull().unique(),
  nationalId: varchar("nationalId", { length: 40 }).notNull().unique(),
  department: varchar("department", { length: 120 }).notNull(),
  jobTitle: varchar("jobTitle", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  status: mysqlEnum("status", ["active", "inactive"]).default("active").notNull(),
  joinedAt: date("joinedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const leaveRequests = mysqlTable("leaveRequests", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  leaveType: varchar("leaveType", { length: 80 }).notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  days: int("days").notNull(),
  reason: text("reason"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  managerNote: text("managerNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  decidedAt: timestamp("decidedAt"),
});

export const attendance = mysqlTable("attendance", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  workDate: date("workDate").notNull(),
  checkIn: timestamp("checkIn"),
  checkOut: timestamp("checkOut"),
  status: mysqlEnum("status", ["present", "late", "absent", "leave"]).default("present").notNull(),
});

export const announcements = mysqlTable("announcements", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  body: text("body").notNull(),
  priority: mysqlEnum("priority", ["normal", "important"]).default("normal").notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  publishedBy: int("publishedBy"),
});

export const knowledgeEntries = mysqlTable("knowledgeEntries", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  content: text("content").notNull(),
  fileKey: varchar("fileKey", { length: 400 }),
  fileUrl: varchar("fileUrl", { length: 600 }),
  createdBy: int("createdBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  title: varchar("title", { length: 220 }).notNull(),
  body: text("body").notNull(),
  isRead: int("isRead").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Employee = typeof employees.$inferSelect;
export type LeaveRequest = typeof leaveRequests.$inferSelect;
export type Attendance = typeof attendance.$inferSelect;
export type Announcement = typeof announcements.$inferSelect;
export type KnowledgeEntry = typeof knowledgeEntries.$inferSelect;
