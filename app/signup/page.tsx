"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ErrorResponse } from "@/types/ErrorResponse";
import AlertMessage from "@/components/AlertMessage";
import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(1),
    organizationName: z.string().min(1),
    headquarterAddress: z.string().min(1),
});

const SignupPage = () => {
    const [error, setError] = useState<ErrorResponse>({ status: 0 });
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await fetch(process.env.NEXT_PUBLIC_SIGNUP_ADMIN_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });

        console.log(res);
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
                    className="space-y-2 flex-1"
                >
                    {error.status === 409 && (
                        <AlertMessage>
                            Register Failed
                        </AlertMessage>
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
