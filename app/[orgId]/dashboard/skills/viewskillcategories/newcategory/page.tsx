"use client";

import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const CreateSkillPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const { orgId } = useParams();

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/skills/skill-category`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (status === "loading") return;

    const token = session?.user?.access_token;

    try {
      const res = await fetch(`${apiKey}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.back();
      }

    } catch {
      console.log("Something went wrong");
    }
  }

  return (
    <div className="max-w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill category</FormLabel>
                <FormControl>
                  <Input placeholder="Libraries" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateSkillPage;
