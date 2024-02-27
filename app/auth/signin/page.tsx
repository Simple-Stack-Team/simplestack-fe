"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputFieldLogin from "@/components/InputFieldLogin";

export const formSchemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

const SignupPage = () => {
    const [error, setError] = useState({});

    const form = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
    });

    async function onSubmit(values: z.infer<typeof formSchemaLogin>) {
        const res = await fetch(process.env.NEXT_PUBLIC_SIGNIN_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        console.log(res)
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
            <div className="bg-slate-300 h-screen flex-1"></div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 flex-1 p-8"
                >
                    {error.status === 401 && <div>Auth failed</div>}
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
                            className="max-w-[400px] w-full mt-4"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SignupPage;
