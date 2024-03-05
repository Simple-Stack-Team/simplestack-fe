"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DepartmentsTable from "./DepartmentsTable";

import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
});

const DepartmentPage = () => {
  const { data: session } = useSession();
  // const [error, setError] = useState();
  const { orgId } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!session) {
      return;
    }

    // @ts-ignore
    const token = await session.user?.access_token;
    console.log(token);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/departments`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      // setError(res);
      return null;
    }
  }

  return (
    <div className="border-[1.5px] border-gray-300 p-4 rounded-lg min-h-screen">
      <div className="flex justify-between">
        <h1 className="mb-4 text-xl font-semibold">Departments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New department</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Create a deparment</DialogTitle>
              <DialogDescription>
                Enter the name of the deparment. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of department</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogTrigger asChild>
                  <Button type="submit">Save</Button>
                </DialogTrigger>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-8">
        <DepartmentsTable />
      </div>
    </div>
  );
};

export default DepartmentPage;
