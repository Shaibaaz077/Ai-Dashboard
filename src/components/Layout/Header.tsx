"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useAuth, UserButton } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      isSignedIn &&
      pathname !== "/Dashboard" &&
      pathname !== "/sign-in" &&
      pathname !== "/sign-up"
    ) {
      router.replace("/Dashboard");
    }
  }, [isSignedIn, pathname, router]);

  const handleSignIn = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  const handleSignUp = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  const handleLogoClick = () => {
    if (isSignedIn) {
      router.push("/Dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 h-20 sm:h-22 bg-white shadow-md">
      <div className="h-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="h-20 sm:h-24 sm:mx-20 sm:px-12 p-4 flex items-center justify-center cursor-pointer"
          onClick={handleLogoClick}
        >
          {pathname !== "/Dashboard" && (
            <Image
              src="/Logo/falconlogo.png"
              alt="Falcon AI"
              width={140}
              height={120}
              priority
            />
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center sm:mx-20 sm:px-12 px-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              {/* Notification */}
              <button
                className="relative rounded-full p-2 hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />

                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
              </button>

              {/* User Menu */}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSignIn}
                className="sm:h-10"
              >
                Sign In
              </Button>

              <Button
                onClick={handleSignUp}
                className="sm:h-10 hover:bg-black/80"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
