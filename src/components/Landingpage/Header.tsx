"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function LandingHeader() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  const handleSignIn = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  const handleSignUp = useCallback(() => {
    router.push("/sign-up");
  }, [router]);

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  if (isSignedIn) return null;

  return (
    <header className="sticky top-0 z-50 h-20 bg-white shadow-md">
      <div className="h-full flex items-center justify-between sm:px-20 px-4">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="cursor-pointer flex items-center"
        >
          <Image
            src="/Logo/falconlogo.png"
            alt="Falcon AI"
            width={140}
            height={120}
            priority
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleSignIn} className="sm:h-10">
            Sign In
          </Button>
          <Button onClick={handleSignUp} className="sm:h-10 hover:bg-black/80">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
