import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchemaSignUp } from "@/app/[orgId]/signup/constants/signup-constants";

interface Props {
  control: UseFormReturn<z.infer<typeof formSchemaSignUp>>["control"];
  name: keyof z.infer<typeof formSchemaSignUp>;
  label: string;
  placeholder: string;
  type: string;
}

const InputField: React.FC<Props> = ({
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
        <FormItem className="mx-auto w-full md:w-[350px]">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
