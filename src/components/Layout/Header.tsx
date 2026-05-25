import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Header() {
  return (
    <>
      <header
        className="h-20 sm:h-24  flex items-center justify-between
         sticky top-0 z-50 backdrop:backdrop-blur-2xl bg-white shadow-md"
      >
        <div className="h-20 sm:h-24 sm:mx-20 sm:px-12 p-4 flex items-center justify-center">
          <Image
            src="/Logo/falconLogo.png"
            alt="Falcon AI"
            className="object-cover"
            width={140}
            height={120}
          />
        </div>
        <div className="flex items-center space-x-4 sm:mx-20 sm:px-12 p-4">
          <Button variant="outline" className="md:text-md sm:h-10 md:p-4">
            Sign In
          </Button>
          <Button className="sm:text-md sm:h-10 md:p-4 hover:bg-black/80">
            Sign Up
          </Button>
        </div>
      </header>
    </>
  );
}

export default Header;
