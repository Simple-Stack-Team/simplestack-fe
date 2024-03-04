"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

import { ErrorResponse } from "@/types/ErrorResponse";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputFieldLogin from "@/components/InputFieldLogin";
import AlertMessage from "@/components/AlertMessage";
import InfoSectionAuth from "@/components/InfoSectionAuth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { formSchemaLogin } from "@/app/auth/signin/constants/signin-constants";

const SignupPage = () => {
  const [error, setError] = useState<ErrorResponse>({ status: 0 });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaLogin>>({
    resolver: zodResolver(formSchemaLogin),
  });

  async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
    setLoading(true);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(res);
        return null;
      }

      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError({ status: 401 });
      } else {
        const orgId = data.user.orgId;

        if (orgId) {
          router.push(`/${orgId}/dashboard`);
        }
      }
    } finally {
      setLoading(false);
    }
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
            <Button
              type="submit"
              disabled={loading}
              className="max-w-[400px] w-full mt-4"
            >
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupPage;
