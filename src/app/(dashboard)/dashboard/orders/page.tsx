import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, products, user } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { Cart3 } from "@solar-icons/react/ssr";
import Link from "next/link";
import { isFarmer, isSupplier, isButcher } from "@/lib/roles";
import {
  AcceptOrderButton,
  PickupOrderButton,
  DeliverOrderButton,
  CancelOrderButton,
  ContactBuyerButton,
} from "./order-actions";

type OrderRow = {
  id: string
  productId: string
  productName: string | null
  counterpartyId: string
  counterpartyName: string | null
  counterpartyPhone: string | null
  counterpartyLocation: string | null
  quantity: number
  totalPrice: string
  status: string
  slaughterWithDelivery: boolean | null
  slaughterFee: string | null
  createdAt: Date
}

const statusLabel: Record<string, string> = {
  pending: "قيد الانتظار",
  confirmed: "مؤكد",
  picked_up: "تم التسليم",
  delivered: "تم التوصيل",
  cancelled: "ملغي",
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  picked_up: "bg-green-100 text-green-800",
  delivered: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColor[status] || "bg-gray-100 text-gray-800"}`}>
      {statusLabel[status] || status}
    </span>
  )
}

function FarmerActions({ order }: { order: OrderRow }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ContactBuyerButton buyerId={order.counterpartyId} productId={order.productId} />
      {order.status === "pending" && (
        <>
          <AcceptOrderButton orderId={order.id} />
          <CancelOrderButton orderId={order.id} />
        </>
      )}
      {order.status === "confirmed" && (
        <>
          <PickupOrderButton orderId={order.id} />
          <CancelOrderButton orderId={order.id} />
        </>
      )}
    </div>
  )
}

function SupplierActions({ order }: { order: OrderRow }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ContactBuyerButton buyerId={order.counterpartyId} productId={order.productId} />
      {order.status === "pending" && (
        <>
          <AcceptOrderButton orderId={order.id} />
          <CancelOrderButton orderId={order.id} />
        </>
      )}
      {order.status === "confirmed" && (
        <>
          <DeliverOrderButton orderId={order.id} />
          <CancelOrderButton orderId={order.id} />
        </>
      )}
    </div>
  )
}

function OrderTable({
  orders,
  showBuyer,
  emptyTitle,
  emptyDesc,
  isSellerView,
  sellerRole,
}: {
  orders: OrderRow[]
  showBuyer: boolean
  emptyTitle: string
  emptyDesc: string
  isSellerView?: boolean
  sellerRole?: string
}) {
  if (orders.length === 0) {
    return (
      <div className="rounded-carton border border-dashed p-14 text-center">
        <Cart3 className="mx-auto mb-4 size-14 text-muted-foreground/30" />
        <p className="font-heading text-xl font-bold text-muted-foreground">{emptyTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground/60">{emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-carton border">
      <table className="w-full text-right text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-5 py-3.5 font-medium text-muted-foreground">المنتج</th>
            <th className="px-5 py-3.5 font-medium text-muted-foreground">{showBuyer ? "المشتري" : "البائع"}</th>
            <th className="px-5 py-3.5 font-medium text-muted-foreground">الكمية</th>
            <th className="px-5 py-3.5 font-medium text-muted-foreground">المجموع</th>
            <th className="px-5 py-3.5 font-medium text-muted-foreground">التاريخ</th>
            <th className="px-5 py-3.5 font-medium text-muted-foreground">الحالة</th>
            {isSellerView && <th className="px-5 py-3.5 font-medium text-muted-foreground">إجراءات</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((order) => (
            <tr key={order.id} className="transition-colors hover:bg-muted/30">
              <td className="px-5 py-4 font-medium">{order.productName}</td>
              <td className="px-5 py-4 text-muted-foreground">
                <div className="flex flex-col">
                  <span>{order.counterpartyName}</span>
                  {order.counterpartyPhone && (
                    <span className="text-xs text-muted-foreground/60" dir="ltr">{order.counterpartyPhone}</span>
                  )}
                </div>
              </td>
              <td className="px-5 py-4">{order.quantity}</td>
              <td className="px-5 py-4 font-medium">{order.totalPrice} د.ج</td>
              <td className="px-5 py-4 text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("ar-DZ")}
              </td>
              <td className="px-5 py-4">
                <StatusBadge status={order.status} />
              </td>
              {isSellerView && (
                <td className="px-5 py-4">
                  {sellerRole === "farmer" ? (
                    <FarmerActions order={order} />
                  ) : (
                    <SupplierActions order={order} />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function OrdersPage() {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) return null;
  const { user: currentUser } = result;
  const role = currentUser.role as string;

  if (isFarmer(role)) {
    const farmerOrders: OrderRow[] = await db
      .select({
        id: orders.id,
        productId: orders.productId,
        productName: products.name,
        counterpartyId: orders.buyerId,
        counterpartyName: user.name,
        counterpartyPhone: user.phone,
        counterpartyLocation: user.location,
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
      .orderBy(desc(orders.createdAt));

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight">الطلبات الواردة</h1>
          <p className="mt-1 text-muted-foreground">
            طلبات الموردين على منتجاتك — قم بتأكيد الطلب أو التواصل مع المورد
          </p>
        </div>

        <OrderTable
          orders={farmerOrders}
          showBuyer={true}
          isSellerView={true}
          sellerRole="farmer"
          emptyTitle="لا توجد طلبات واردة"
          emptyDesc="عندما يطلب الموردون منتجاتك، ستظهر هنا ويمكنك تأكيدها أو إلغاؤها"
        />
      </div>
    );
  }

  if (isSupplier(role)) {
    const incomingOrders: OrderRow[] = await db
      .select({
        id: orders.id,
        productId: orders.productId,
        productName: products.name,
        counterpartyId: orders.buyerId,
        counterpartyName: user.name,
        counterpartyPhone: user.phone,
        counterpartyLocation: user.location,
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
      .orderBy(desc(orders.createdAt));

    const outgoingOrders: OrderRow[] = await db
      .select({
        id: orders.id,
        productId: orders.productId,
        productName: products.name,
        counterpartyId: orders.sellerId,
        counterpartyName: user.name,
        counterpartyPhone: user.phone,
        counterpartyLocation: user.location,
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
      .orderBy(desc(orders.createdAt));

    return (
      <div className="flex flex-col gap-10">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight">الطلبات</h1>
          <p className="mt-1 text-muted-foreground">إدارة طلباتك الواردة والصادرة</p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold">الطلبات الواردة (من الجزارين)</h2>
            <OrderTable
              orders={incomingOrders}
              showBuyer={true}
              isSellerView={true}
              sellerRole="supplier"
              emptyTitle="لا توجد طلبات واردة"
              emptyDesc="عندما يطلب الجزارون منتجاتك، ستظهر هنا ويمكنك تأكيدها أو إلغاؤها"
            />
          </div>

          <div>
            <h2 className="mb-4 font-heading text-2xl font-bold">الطلبات الصادرة (للفلاحين)</h2>
            <OrderTable
              orders={outgoingOrders}
              showBuyer={false}
              emptyTitle="لا توجد طلبات صادرة"
              emptyDesc="تصفح منتجات الفلاحين واطلب ما تحتاجه"
            />
          </div>
        </div>
      </div>
    );
  }

  if (isButcher(role)) {
    const buyerOrders: OrderRow[] = await db
      .select({
        id: orders.id,
        productId: orders.productId,
        productName: products.name,
        counterpartyId: orders.sellerId,
        counterpartyName: user.name,
        counterpartyPhone: user.phone,
        counterpartyLocation: user.location,
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
      .orderBy(desc(orders.createdAt));

    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight">طلباتي</h1>
          <p className="mt-1 text-muted-foreground">الطلبات التي قدمتها على منتجات الموردين</p>
        </div>

        <OrderTable
          orders={buyerOrders}
          showBuyer={false}
          emptyTitle="لا توجد طلبات"
          emptyDesc="تصفح منتجات الموردين واطلب ما تحتاجه"
        />
      </div>
    );
  }
}
