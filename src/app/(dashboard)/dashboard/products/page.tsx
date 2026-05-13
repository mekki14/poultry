import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { headers } from "next/headers";
import { Box } from "@solar-icons/react/ssr";
import { ProductForm } from "./product-form";
import { DeleteProductButton } from "./delete-button";
import { isFarmer, isSupplier } from "@/lib/roles";

export default async function ProductsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const { user: currentUser } = session;
  const role = currentUser.role as string;

  // Butchers cannot list products
  if (role === "butcher") {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">غير مصرح</h1>
        <p className="mt-1 text-muted-foreground">الجزارون لا يمكنهم إضافة منتجات</p>
      </div>
    );
  }

  const userProducts = await db
    .select()
    .from(products)
    .where(eq(products.userId, session.user.id))
    .orderBy(desc(products.createdAt));

  const categories = [
    { value: "chicken", label: "دجاج حي" },
    { value: "eggs", label: "بيض" },
    { value: "feed", label: "أعلاف" },
    { value: "equipment", label: "معدات" },
    { value: "other", label: "أخرى" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">إدارة المنتجات</h1>
        <p className="mt-1 text-muted-foreground">
          {isFarmer(role) ? "أضف، عدّل، وصنف منتجاتك ليتمكن الموردون من طلبها" : "أضف، عدّل، وصنف منتجاتك ليتمكن الجزارون من طلبها"}
        </p>
      </div>

      {/* Add Product Form */}
      <ProductForm categories={categories} />

      {/* Products List */}
      {userProducts.length === 0 ? (
        <div className="rounded-carton border border-dashed p-14 text-center">
          <Box className="mx-auto mb-4 size-14 text-muted-foreground/30" />
          <p className="font-heading text-xl font-bold text-muted-foreground">لا توجد منتجات</p>
          <p className="mt-1 text-sm text-muted-foreground/60">أضف منتجك الأول باستخدام النموذج أعلاه</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-carton border bg-card p-5 shadow-kitov transition-all duration-300 hover:shadow-kitov-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold">{product.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {categories.find((c) => c.value === product.category)?.label || product.category}
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-kitov-yellow/20 px-3 py-1 text-sm font-bold text-kitov-dark">
                  {product.price} د.ج
                </span>
              </div>
              {product.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
              )}
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  الكمية: {product.quantity} {product.unit}
                </span>
                <DeleteProductButton id={product.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
