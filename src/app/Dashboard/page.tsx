// src/app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function Dashboard() {
  const user = await currentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.firstName}! 👋</h1>
      <p className="text-gray-500">{user?.emailAddresses[0].emailAddress}</p>

      {/* Logout Button */}
      <SignOutButton redirectUrl="/">
        <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  );
}
