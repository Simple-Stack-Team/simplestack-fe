"use client";

import { UserRoundPlus } from "lucide-react";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormSchema } from "./constants/FormSchema";
import { useEmployeeStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { roles } from "./constants/roles";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  employeeId: string;
  employeeRoles: string[];
}

const Modal = ({ employeeId, employeeRoles }: Props) => {
  const { data: session } = useSession();
  const { orgId } = useParams();

  const setEmployeeRoles = useEmployeeStore(
    (state) => state.updateEmployeeRoles
  );

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

      setEmployeeRoles(employeeId, data.roles);
    } catch (error) {
      console.error("Error assigning roles:", error);
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roles: employeeRoles,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          <UserRoundPlus size={16} />
          Assign a role
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign roles to this user</DialogTitle>
          <DialogDescription>
            Select one or multiple roles to assign to this user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.role,
                                        ])
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
              <DialogTrigger asChild>
                <Button type="submit">Sumbit</Button>
              </DialogTrigger>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;