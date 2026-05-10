import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FlocksPage() {
  const flocks = await db.query.flocks.findMany();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Flocks</h1>
        <Link href="/dashboard/flocks/new">
          <Button>Add Flock</Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flocks.map((flock) => (
          <div key={flock.id} className="rounded-xl border p-6">
            <h2 className="font-semibold">{flock.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {flock.breed} &middot; {flock.count} birds
            </p>
          </div>
        ))}
        {flocks.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            No flocks yet. Add your first one!
          </p>
        )}
      </div>
    </div>
  );
}
