// src/app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <>
      <section>page</section>
    </>
  );
}
