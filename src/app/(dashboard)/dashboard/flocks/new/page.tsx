import { db, flocks } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function createFlock(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const breed = formData.get("breed") as string;
  const count = parseInt(formData.get("count") as string, 10);

  await db.insert(flocks).values({ name, breed, count });

  revalidatePath("/dashboard/flocks");
  redirect("/dashboard/flocks");
}

export default function NewFlockPage() {
  return (
    <div className="mx-auto max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Add New Flock</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createFlock} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Flock Name</Label>
              <Input id="name" name="name" placeholder="e.g. Layer Hens A" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input id="breed" name="breed" placeholder="e.g. Rhode Island Red" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="count">Bird Count</Label>
              <Input id="count" name="count" type="number" min={0} required />
            </div>
            <div className="flex gap-3">
              <Button type="submit">Create</Button>
              <Link href="/dashboard/flocks">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
