"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/InputField";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z.string().min(8),
    organizationName: z.string().min(3),
    headquarterAddress: z.string().min(3),
});


const SignupPage = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(process.env.SIGNUP_ADMIN_URL);
    
        const res = await fetch(process.env.NEXT_PUBLIC_SIGNUP_ADMIN_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
    
        if (!res.ok) return null;

        router.push('/api/auth/signin');
    }

    return (
        <div className="flex">
            <div className="bg-slate-300 h-screen flex-1"></div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 flex-1 p-8"
                >
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default SignupPage;
