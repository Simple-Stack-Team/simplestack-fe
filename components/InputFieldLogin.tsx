import { UseFormReturn } from "react-hook-form";
import React from "react";
import { z } from "zod";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchemaLogin } from "@/app/auth/signin/page";

interface Props {
    control: UseFormReturn<z.infer<typeof formSchemaLogin>>["control"];
    name: keyof z.infer<typeof formSchemaLogin>;
    label: string;
    placeholder: string;
    type: string;
}

const InputFieldLogin: React.FC<Props> = ({
    name,
    label,
    placeholder,
    type,
    control,
}: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="max-w-[400px] mx-auto">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type={type}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default InputFieldLogin;
