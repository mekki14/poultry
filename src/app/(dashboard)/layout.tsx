import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Flocks", href: "/dashboard/flocks" },
  { label: "Health", href: "/dashboard/health" },
  { label: "Feeding", href: "/dashboard/feeding" },
  { label: "Eggs", href: "/dashboard/eggs" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col border-r bg-muted/30">
        <div className="flex h-14 items-center border-b px-6 font-semibold tracking-tight">
          Poultry Manager
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <p className="mb-2 truncate text-sm text-muted-foreground">{session.user.email}</p>
          <form action={logout}>
            <Button variant="outline" size="sm" className="w-full" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
