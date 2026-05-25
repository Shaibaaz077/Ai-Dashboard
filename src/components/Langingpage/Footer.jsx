import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <section className="bg-background border-t border-border sm:px-6 py-4">
      <div className="container flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center justify-center">
          <Image
            src="/Logo/falconfooter.png"
            alt="Falcon AI"
            className="object-cover"
            width={140}
            height={120}
          />
        </div>
        <div className="flex gap-6 sm:gap-4 mb-2">
          <p className="text-muted-foreground cursor-pointer hover:text-primary">
            Privacy
          </p>
          <p className="text-muted-foreground cursor-pointer hover:text-primary">
            Terms
          </p>
          <p className="text-muted-foreground cursor-pointer hover:text-primary">
            Docs
          </p>
        </div>
        <p className="text-center text-muted-foreground">
          © {new Date().getFullYear()} Falcon AI. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
