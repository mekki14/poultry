import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products, orders, user, messages } from "@/lib/db/schema";
import { eq, desc, and, or, count } from "drizzle-orm";
import { headers } from "next/headers";
import { FarmerDashboardClient } from "./farmer-dashboard-client";
import { BuyerDashboardClient } from "./buyer-dashboard-client";
import { isFarmer } from "@/lib/roles";

export default async function DashboardPage() {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) return null;
  const { user: currentUser } = result;

  const role = currentUser.role as string;

  if (!isFarmer(role)) {
    // Buyer dashboard (butcher or supplier)
    const totalProducts = await db
      .select({ count: count() })
      .from(products)
      .then((r) => r[0].count);

    const buyerOrders = await db
      .select({
        id: orders.id,
        productName: products.name,
        sellerName: user.name,
        quantity: orders.quantity,
        totalPrice: orders.totalPrice,
        status: orders.status,
        slaughterWithDelivery: orders.slaughterWithDelivery,
        slaughterFee: orders.slaughterFee,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(eq(orders.buyerId, currentUser.id))
      .leftJoin(products, eq(orders.productId, products.id))
      .leftJoin(user, eq(orders.sellerId, user.id))
      .orderBy(desc(orders.createdAt))
      .limit(5);

    const pendingOrders = buyerOrders.filter((o) => o.status === "pending").length;

    const unreadMessages = await db
      .select({ count: count() })
      .from(messages)
      .where(
        and(eq(messages.receiverId, currentUser.id), eq(messages.read, false))
      )
      .then((r) => r[0].count);

    return (
      <BuyerDashboardClient
        userName={currentUser.name}
        role={role}
        stats={{
          totalProducts,
          totalOrders: buyerOrders.length,
          pendingOrders,
          unreadMessages,
        }}
        recentOrders={buyerOrders}
      />
    );
  }

  // Farmer dashboard
  const recentProducts = await db
    .select()
    .from(products)
    .where(eq(products.userId, currentUser.id))
    .orderBy(desc(products.createdAt))
    .limit(10);

  const recentOrders = await db
    .select({
      id: orders.id,
      productName: products.name,
      buyerName: user.name,
      quantity: orders.quantity,
      totalPrice: orders.totalPrice,
      status: orders.status,
      slaughterWithDelivery: orders.slaughterWithDelivery,
      slaughterFee: orders.slaughterFee,
      createdAt: orders.createdAt,
    })
    .from(orders)
    .where(eq(orders.sellerId, currentUser.id))
    .leftJoin(products, eq(orders.productId, products.id))
    .leftJoin(user, eq(orders.buyerId, user.id))
    .orderBy(desc(orders.createdAt))
    .limit(5);

  return (
    <FarmerDashboardClient
      userName={currentUser.name}
      recentProducts={recentProducts}
      recentOrders={recentOrders}
    />
  );
}
