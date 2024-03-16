"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import SignUpEmployee from "@/components/SignUpEmployee";
import { useRouter, useParams } from "next/navigation";
import { ErrorResponse } from "@/types/ErrorResponse";
import AlertMessage from "@/components/AlertMessage";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchemaSignUp } from "@/app/[orgId]/signup/constants/signup-constants";
import logo from "@/public/logoWhiteTheme.svg";
// import global from "@/public/signup.png";
import global from "@/public/gradient.svg";

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
    <div className="flex h-screen items-center justify-center">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 pb-4 lg:px-16"
          >
            <div className="mb-8 mt-4 flex items-center gap-2">
              <Image src={logo} alt="Logo" width={32} />
              <p className="font-bold">Simple Stack</p>
            </div>
            <h1 className="mb-4 text-3xl font-semibold">
              Keep your online <br />
              business organized
            </h1>
            <p className="text-xs font-medium text-gray-500">
              Sign up to start right now for free
            </p>
            {error.status === 409 && (
              <AlertMessage>The name already exist</AlertMessage>
            )}
            <div className="space-y-2 pt-4">
              <SignUpEmployee
                name="name"
                label="Name*"
                placeholder="Name"
                type="text"
                control={form.control}
              />
              <SignUpEmployee
                name="email"
                label="Email*"
                placeholder="Email"
                type="email"
                control={form.control}
              />
              <SignUpEmployee
                name="password"
                label="Password*"
                placeholder="Password"
                type="password"
                control={form.control}
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="mb-4 mt-4 w-full max-w-[400px] text-xs"
              >
                Create Account
              </Button>
            </div>
            <p className="text-xs font-medium text-gray-500">
              Already have an account?{" "}
              <Link
                href={`/auth/signin`}
                className="font-semibold text-slate-900"
              >
                Login Here
              </Link>
            </p>
          </form>
        </Form>
      </div>
      <div className="hidden h-screen flex-1 p-2 md:block">
        <div className="h-full w-full overflow-hidden rounded-lg bg-violet-600">
          <Image
            src={global}
            alt="Global connection"
            quality={100}
            style={{ width: "100%", height: "100vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupEmployee;
