import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, uuid, boolean, index } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: text("role").default("farmer").notNull(),
  phone: text("phone"),
  location: text("location"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const flocks = pgTable("flocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  breed: text("breed"),
  count: integer("count").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const healthRecords = pgTable("health_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  flockId: uuid("flock_id").notNull().references(() => flocks.id),
  date: timestamp("date").defaultNow().notNull(),
  diagnosis: text("diagnosis"),
  treatment: text("treatment"),
  notes: text("notes"),
});

export const feedLogs = pgTable("feed_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  flockId: uuid("flock_id").notNull().references(() => flocks.id),
  date: timestamp("date").defaultNow().notNull(),
  feedType: text("feed_type").notNull(),
  amountKg: integer("amount_kg").notNull(),
});

export const eggProduction = pgTable("egg_production", {
  id: uuid("id").defaultRandom().primaryKey(),
  flockId: uuid("flock_id").notNull().references(() => flocks.id),
  date: timestamp("date").defaultNow().notNull(),
  count: integer("count").notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  unit: text("unit").notNull().default("kg"),
  quantity: integer("quantity").notNull().default(0),
  category: text("category").default("other"),
  imageUrl: text("image_url"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  user: one(user, {
    fields: [products.userId],
    references: [user.id],
  }),
}));

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  sellerId: text("seller_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  buyerId: text("buyer_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull(),
  totalPrice: text("total_price").notNull(),
  status: text("status").notNull().default("pending"),
  slaughterWithDelivery: boolean("slaughter_with_delivery").default(false).notNull(),
  slaughterFee: text("slaughter_fee"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  product: one(products, {
    fields: [orders.productId],
    references: [products.id],
  }),
  seller: one(user, {
    fields: [orders.sellerId],
    references: [user.id],
  }),
  buyer: one(user, {
    fields: [orders.buyerId],
    references: [user.id],
  }),
}));

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  receiverId: text("receiver_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  productId: uuid("product_id").references(() => products.id, {
    onDelete: "set null",
  }),
  content: text("content").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(user, {
    fields: [messages.senderId],
    references: [user.id],
  }),
  receiver: one(user, {
    fields: [messages.receiverId],
    references: [user.id],
  }),
  product: one(products, {
    fields: [messages.productId],
    references: [products.id],
  }),
}));
