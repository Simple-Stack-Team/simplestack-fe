"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import SignUpEmployee from "@/components/SignUpEmployee";
import { useRouter, useParams } from "next/navigation";
import { ErrorResponse } from "@/types/ErrorResponse";
import AlertMessage from "@/components/AlertMessage";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchemaSignUp } from "@/app/[orgId]/signup/constants/signup-constants";

const SignupEmployee = () => {
  const [error, setError] = useState<ErrorResponse>({ status: 0 });
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const orgId = params.orgId;

  const form = useForm<z.infer<typeof formSchemaSignUp>>({
    resolver: zodResolver(formSchemaSignUp),
  });

  async function onSubmit(values: z.infer<typeof formSchemaSignUp>) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/${orgId}/signup`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      setError(res);

      return null;
    }

    router.push("/api/auth/signin");
  }

  return (
    <div className="flex items-center">
      <div className="bg-slate-300 h-screen flex-1"></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-1 p-8"
        >
          {error.status === 409 && <AlertMessage>Register Failed</AlertMessage>}
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

          <div className="flex justify-center">
            <Button type="submit" className="max-w-[400px] w-full mt-4">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupEmployee;
