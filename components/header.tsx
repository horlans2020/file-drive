import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

export const Header = () => {
  return (
    <header className="border-b py-4 bg-gray-50">
      <div className="container mx-auto  flex justify-between items-center">
        <div>
          File<span className="text-purple-500 font-bold">Drive</span>
        </div>
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <OrganizationSwitcher />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
