"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AtSign, LockKeyhole } from "lucide-react";
import { z } from "zod";

import { ErrorResponse } from "@/types/ErrorResponse";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputFieldLogin from "@/components/InputFieldLogin";
import AlertMessage from "@/components/AlertMessage";
import InfoSectionAuth from "@/components/InfoSectionAuth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { formSchemaLogin } from "@/app/auth/signin/constants/signin-constants";
import logo from "@/public/logoWhiteTheme.svg";

const LoginPage = () => {
  const [error, setError] = useState<ErrorResponse>({ status: 0 });
  const [loading, setLoading] = useState(false);
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
    <div className="flex items-center sm:flex-row">
      <div className="hidden flex-1 sm:block">
        <InfoSectionAuth />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-2 p-8"
        >
          <div className="mx-auto mb-8 max-w-[400px]">
            <div className="mb-8">
              <Image src={logo} alt="logo" width={32} />
            </div>
            <h1 className="mb-2 text-2xl font-semibold">Welcome back!</h1>
            <p className="text-sm text-gray-500">
              Enter to get unlimited to data & information.
            </p>
          </div>
          {error.status === 401 && (
            <AlertMessage>
              The email address or password you entered was not correct.
            </AlertMessage>
          )}
          {error.status === 404 && (
            <AlertMessage>The account not exist</AlertMessage>
          )}
          <div className="space-y-4">
            <InputFieldLogin
              name="email"
              label="Email*"
              placeholder="Email"
              type="email"
              control={form.control}
              icon={<AtSign size={18} className="absolute right-3" />}
            />
            <InputFieldLogin
              name="password"
              label="Password*"
              placeholder="Password"
              type="password"
              control={form.control}
              icon={<LockKeyhole size={18} className="absolute right-3" />}
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading}
              className="mt-4 w-full max-w-[400px]"
            >
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
          <div className="flex justify-center pt-4">
            <p>
              <span className="text-sm">Don&apos;t have an account? </span>
              <Link
                href="/signup"
                className="text-sm font-semibold text-[#5138ee] underline underline-offset-2"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
