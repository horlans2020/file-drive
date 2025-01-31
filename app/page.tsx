"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton, useSession, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);
  const session = useSession();

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
        <Button
          onClick={() =>
            createFile({
              name: "new file",
            })
          }
        >
          test upload
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
        <Button
          onClick={() =>
            createFile({
              name: "new file",
            })
          }
        >
          test upload
        </Button>
        <div>
          {files?.map((file) => {
            return <div key={file._id}>{file.name}</div>;
          })}
        </div>
      </SignedIn>
    </div>
  );
}
