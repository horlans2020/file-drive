"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import { EllipsisVertical, TrashIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function FileCardActions({ file }: { file: Doc<"files"> }) {
  const deleteFile = useMutation(api.files.deleteFile);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteFile({ fileId: file._id });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="flex gap-1 text-red-500 items-center cursor-pointer">
            <TrashIcon className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const FileCard = ({ file }: { file: Doc<"files"> }) => {
  return (
    <div>
      <Card>
        <CardHeader className="relative">
          <CardTitle>{file.name}</CardTitle>
          <div className="absolute top-2 right-2">
            <FileCardActions file={file} />
          </div>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p></p>
        </CardContent>
        <CardFooter>
          <Button>Download</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FileCard;
