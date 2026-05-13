import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products, user } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { headers } from "next/headers";
import { Magnifier } from "@solar-icons/react/ssr";
import { OrderDialog, ContactButton } from "./order-dialog";
import { isFarmer, sellerRoleForBuyer, roleLabel } from "@/lib/roles";

export default async function BrowseProductsPage() {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) return null;
  const { user: currentUser } = result;
  const role = currentUser.role as string;

  const targetSellerRole = sellerRoleForBuyer(role);

  if (isFarmer(role) || !targetSellerRole) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">تصفح المنتجات</h1>
        <p className="mt-1 text-muted-foreground">
          هذه الصفحة مخصصة للموردين والجزارين
        </p>
      </div>
    );
  }

  const allProducts = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      unit: products.unit,
      quantity: products.quantity,
      category: products.category,
      sellerId: products.userId,
      sellerName: user.name,
      sellerRole: user.role,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(user, eq(products.userId, user.id))
    .where(eq(user.role, targetSellerRole))
    .orderBy(desc(products.createdAt));

  const categories = [
    { value: "chicken", label: "دجاج حي" },
    { value: "eggs", label: "بيض" },
    { value: "feed", label: "أعلاف" },
    { value: "equipment", label: "معدات" },
    { value: "other", label: "أخرى" },
  ];

  const catLabel = (val: string | null) =>
    categories.find((c) => c.value === val)?.label || val || "أخرى";

  const sellerLabel = roleLabel(targetSellerRole);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">تصفح المنتجات</h1>
        <p className="mt-1 text-muted-foreground">
          منتجات {sellerLabel} — اختر ما تحتاجه واطلبه مباشرة
        </p>
      </div>

      {allProducts.length === 0 ? (
        <div className="rounded-carton border border-dashed p-14 text-center">
          <Magnifier className="mx-auto mb-4 size-14 text-muted-foreground/30" />
          <p className="font-heading text-xl font-bold text-muted-foreground">لا توجد منتجات متاحة</p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            لا يوجد منتجات متاحة حالياً من {sellerLabel}. تابع قريباً
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-carton border bg-card p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold">{product.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {catLabel(product.category)}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-kitov-yellow/20 px-3 py-1 text-sm font-bold text-kitov-dark">
                  {product.price} د.ج
                </span>
              </div>

              {product.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
              )}

              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span>
                  الكمية: {product.quantity} {product.unit}
                </span>
                <span className="font-medium text-kitov-red">{product.sellerName}</span>
              </div>

              <div className="mt-4 flex gap-2">
                <OrderDialog
                  productId={product.id}
                  sellerId={product.sellerId}
                  productName={product.name}
                  price={product.price}
                  unit={product.unit}
                />
                {product.sellerId !== currentUser.id && (
                  <ContactButton sellerId={product.sellerId} productId={product.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
