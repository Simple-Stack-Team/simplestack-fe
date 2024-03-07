"use client";

import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

interface Props {
  departmentId: string;
  name: string;
}

const UpdateDepartment = ({ name, departmentId }: Props) => {
  const { data: session } = useSession();
  const { orgId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  // @ts-ignore
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/departments/${departmentId}`;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session) return null;

    // @ts-ignore
    const token = await session?.user?.access_token;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) return null;
  };

  return (
    <div className="cursor-pointer px-2 py-1 text-sm hover:bg-slate-100">
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <Pencil size={16} />
          Update
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Department</DialogTitle>
          <DialogDescription>
            Make changes to your department here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogTrigger>
              <Button type="submit">Save changes</Button>
            </DialogTrigger>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </div>
  );
};

export default UpdateDepartment;
