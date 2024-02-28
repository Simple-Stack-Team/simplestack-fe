"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { z } from "zod";

import { ErrorResponse } from "@/types/ErrorResponse";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputFieldLogin from "@/components/InputFieldLogin";
import AlertMessage from "@/components/AlertMessage";
import InfoSectionAuth from "@/components/InfoSectionAuth";

export const formSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const SignupPage = () => {
  const [error, setError] = useState<ErrorResponse>({ status: 0 });

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
  });

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    const res = await fetch(process.env.NEXT_PUBLIC_SIGNIN_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      setError(res);

      return null;
    }

    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
  }

  return (
    <div className="flex items-center">
      <InfoSectionAuth />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-1 p-8"
        >
          <div className="max-w-[400px] mx-auto mb-16">
            <h1 className="text-2xl font-semibold mb-2">Login</h1>
            <p>
              <span>Don&apos;t have an account? </span>
              <Link href="/" className="text-primary font-semibold">
                Register
              </Link>
            </p>
          </div>
          {error.status === 401 && <AlertMessage>Auth failed</AlertMessage>}
          <InputFieldLogin
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            control={form.control}
          />
          <InputFieldLogin
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
            control={form.control}
          />
          <div className="flex justify-center">
            <Button type="submit" className="max-w-[400px] w-full mt-4">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupPage;
