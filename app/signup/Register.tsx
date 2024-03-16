"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import { ErrorResponse } from "@/types/ErrorResponse";
import AlertMessage from "@/components/AlertMessage";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema } from "@/app/signup/constants/signup-admin-constants";
import page from "@/public/page.png";

const Register = () => {
  const [error, setError] = useState<ErrorResponse>({ status: 0 });
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;

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
      <div className="flex justify-center space-y-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-1 px-8 lg:px-16 "
          >
            <h1 className="mx-auto mb-4 max-w-[400px] text-2xl font-semibold">
              Create your account 👏
            </h1>

            {error.status === 409 && (
              <AlertMessage>The email already exist</AlertMessage>
            )}
            <InputField
              name="name"
              label="Name"
              placeholder="Name"
              type="text"
              control={form.control}
            />
            <InputField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
              control={form.control}
            />
            <InputField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              control={form.control}
            />
            <InputField
              name="organizationName"
              label="Organization"
              placeholder="Organization"
              type="text"
              control={form.control}
            />
            <InputField
              name="headquarterAddress"
              label="Address"
              placeholder="Address"
              type="text"
              control={form.control}
            />
            <div className="flex justify-center">
              <Button type="submit" className="mt-4 w-full max-w-[400px]">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="hidden h-screen flex-1 p-2 md:block">
        <div className="h-full w-full rounded-lg bg-violet-600"></div>
      </div>
    </div>
  );
};

export default Register;
