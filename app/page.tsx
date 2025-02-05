"use client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FileCard from "@/components/file-card";
// import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  file: z.custom<FileList>((val) => val instanceof FileList, "Required").refine((files) => files.length > 0, "Required"),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  });

  const fileRef = form.register("file");

  const organization = useOrganization();
  const user = useUser();
  let orgId: any = undefined;
  if (organization.isLoaded) {
    orgId = organization?.organization?.id ?? user.user?.id;
  }
  const createFile = useMutation(api.files.createFile);

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": values.file[0].type },
      body: values.file[0],
    });
    const { storageId } = await result.json();
    createFile({
      name: values.title,
      type: "image",
      fileId: storageId,
      orgId,
    });
    form.reset();
  }

  return (
    <main className="container mx-auto pt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold">Your Files</h2>
        <div></div>
      </div>

      <div className="border-b mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border p-2 w-[30vw] rounded-md my-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>title</FormLabel>
                  <FormControl>
                    <Input placeholder="title of file" {...field} />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>file</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      {...fileRef}
                      // onChange={(event) => {
                      //   if (!event.target.files) return;
                      //   onChange(event.target.files[0]);
                      // }}
                    />
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <Button type="submit">Create file</Button>
          </form>
        </Form>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {files?.map((file) => {
          return <FileCard key={file._id} file={file} />;
        })}
      </div>
    </main>
  );
}
