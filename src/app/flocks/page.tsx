import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function FlocksPage() {
  const flocks = await db.query.flocks.findMany();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Poultry Flocks</h1>
      <div className="grid gap-4">
        {flocks.map(flock => (
          <div key={flock.id} className="p-4 border rounded shadow">
            <p className="font-semibold">{flock.name}</p>
            <p className="text-sm text-gray-600">{flock.breed} - {flock.count} birds</p>
          </div>
        ))}
        {flocks.length === 0 && <p>No flocks found. Start adding some!</p>}
      </div>
    </div>
  );
}

