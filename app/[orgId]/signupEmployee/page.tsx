"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SignUpEmployee from "@/components/SignUpEmployee";
import { useRouter, useParams } from "next/navigation";

export const formSchemaSignUp = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(3),
});

const SignupEmployee = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const orgId = params.orgId;
  console.log(orgId);
  const form = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
  });

  async function onSubmit(values: z.infer<typeof formSchemaSignUp>) {
    const res = await fetch(
      process.env.NEXT_PUBLIC_EMPLOYEE_SIGNUP_URL! + orgId + "/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    if (!res.ok) return null;

    router.push("/[orgId]/dashboard");
  }

  return (
    <div className="flex">
      <div className="bg-slate-300 h-screen flex-1"></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-1 p-8"
        >
          <SignUpEmployee
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            control={form.control}
          />
          <SignUpEmployee
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            control={form.control}
          />
          <SignUpEmployee
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            control={form.control}
          />

          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupEmployee;
