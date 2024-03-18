import { UseFormReturn } from "react-hook-form";
import React, { ReactNode } from "react";
import { z } from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchemaLogin } from "@/app/auth/signin/constants/signin-constants";

interface Props {
  control: UseFormReturn<z.infer<typeof formSchemaLogin>>["control"];
  name: keyof z.infer<typeof formSchemaLogin>;
  label: string;
  placeholder: string;
  type: string;
  icon: ReactNode;
}

const InputFieldLogin: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  icon,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mx-auto max-w-[400px]">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative flex items-center">
              {icon}
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                className="pr-9"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFieldLogin;
