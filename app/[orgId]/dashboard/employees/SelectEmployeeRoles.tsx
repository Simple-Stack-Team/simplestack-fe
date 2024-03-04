"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const roles = [
  {
    id: "admin",
    label: "Organization Administrator",
    role: "ORGANIZATION_ADMIN",
  },
  {
    id: "department",
    label: "Department Manager",
    role: "DEPARTMENT_MANAGER",
  },
  {
    id: "project",
    label: "Project Manager",
    role: "PROJECT_MANAGER",
  },
] as const;

const FormSchema = z.object({
  roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

interface SelectEmployeeRolesProps {
  employeeId: string;
  employeeRoles: string[];
}

export function SelectEmployeeRoles({
  employeeId,
  employeeRoles,
}: SelectEmployeeRolesProps) {
  const { orgId } = useParams();
  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roles: employeeRoles,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!session) {
        return;
      }

      // @ts-ignore
      const token = session.user?.access_token;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/employees/assign-roles/${employeeId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          roles: data.roles,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign roles to the employee");
      }

      console.log("Roles assigned successfully");
    } catch (error) {
      console.error("Error assigning roles:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              {roles.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="roles"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.role)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.role])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.role
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sumbit</Button>
      </form>
    </Form>
  );
}
