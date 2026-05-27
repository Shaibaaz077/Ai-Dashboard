"use client";

import React, { useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function Header() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/Dashboard");
    }
  }, [isSignedIn, router]);

  const handleSignIn = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  const handleSignUp = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  // Show nothing while redirecting
  if (isSignedIn) return null;

  return (
    <header className="h-20 sm:h-24 flex items-center justify-between sticky top-0 z-50 bg-white shadow-md">
      {/* Logo */}
      <div className="h-20 sm:h-24 sm:mx-20 sm:px-12 p-4 flex items-center justify-center">
        <Image
          src="/Logo/falconlogo.png"
          alt="Falcon AI"
          className="object-cover"
          width={140}
          height={120}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center space-x-4 sm:mx-20 sm:px-12 p-4">
        <Button
          variant="outline"
          className="md:text-md sm:h-10 md:p-4"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          className="sm:text-md sm:h-10 md:p-4 hover:bg-black/80"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}
