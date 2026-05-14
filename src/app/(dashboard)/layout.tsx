import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, messages } from "@/lib/db/schema";
import { eq, and, count } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Logout,
  Leaf,
} from "@solar-icons/react/ssr";
import { logout } from "./actions";
import { roleLabel } from "@/lib/roles";
import { SidebarNav } from "@/components/sidebar-nav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) redirect("/login");
  const { user: currentUser } = result;

  const role = currentUser.role as string;
  const label = roleLabel(role);

  const [pendingOrdersCount] = await db
    .select({ count: count() })
    .from(orders)
    .where(and(eq(orders.sellerId, currentUser.id), eq(orders.status, "pending")));

  const [unreadMessagesCount] = await db
    .select({ count: count() })
    .from(messages)
    .where(and(eq(messages.receiverId, currentUser.id), eq(messages.read, false)));

  return (
    <div className="flex min-h-screen bg-brand-shell/50" dir="rtl">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-l bg-white shadow-sm">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 border-b px-6">
          <Leaf weight="BoldDuotone" size={28} className="text-brand-red" />
          <span className="font-heading text-xl font-extrabold tracking-tight text-brand-dark">
            فلاحك
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
            {label}
          </p>
          <SidebarNav
            role={role}
            initialPendingOrders={pendingOrdersCount.count}
            initialUnreadMessages={unreadMessagesCount.count}
          />
        </nav>

        {/* User info & logout */}
        <div className="border-t p-4">
          <p className="mb-1 truncate px-1 text-sm font-medium text-brand-dark">
            {currentUser.name}
          </p>
          <p className="mb-1 truncate px-1 text-xs text-muted-foreground">{currentUser.email}</p>
          <p className="mb-3 truncate px-1 text-xs font-medium text-brand-red">{label}</p>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600"
            >
              <Logout className="size-4" />
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
