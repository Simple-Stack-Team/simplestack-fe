"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type TeamRole = {
  teamroleId: string;
  nrOfMembers: number;
};

type ProjectFormValues = {
  name: string;
  period: string;
  startDate: string;
  deadlineDate: string;
  status: string;
  description: string;
  technologyStack: string[];
  teamRoles: TeamRole[];
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  period: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  startDate: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  deadlineDate: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  status: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),
  description: z
    .string()
    .min(2, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
  technologyStack: z.array(
    z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(50),
  ),

  teamRoles: z.array(
    z.object({
      teamroleId: z.string().min(1),
      nrOfMembers: z.number().refine((value) => Number.isInteger(value), {
        message: "Number of Members must be an integer.",
      }),
    }),
  ),
});

const CreateProject = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      period: "",
      startDate: "",
      deadlineDate: "",
      status: "",
      description: "",
      technologyStack: [],
      teamRoles: [
        {
          teamroleId: "",
          nrOfMembers: 0,
        },
      ],
    },
  });

  const { orgId } = useParams();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects`;

  async function onSubmit(values: ProjectFormValues) {
    if (!session) return null;

    // @ts-ignore
    const token = session.user?.access_token;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(values),
    });
    console.log(values);
    if (!res.ok) {
      return null;
    } else router.refresh();
  }
  return (
    <div className="flex justify-between">
      <h1 className="mb-4 text-xl font-semibold">Project</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="">Create a new project</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project period</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <div className="flex flex-row gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="deadlineDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline Date</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="technologyStack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technology Stack</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value.join(",")}
                        onChange={(e) =>
                          field.onChange(e.target.value.split(","))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {""}
              {form.getValues("teamRoles").map((_, index) => (
                <div key={index}>
                  <FormField
                    control={form.control}
                    name={`teamRoles.${index}.teamroleId` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{`Team Role ${index + 1} - Roles`}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`teamRoles.${index}.nrOfMembers` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{`Team Role ${index + 1} - Number of Members`}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <DialogTrigger asChild>
                <Button type="submit">Create</Button>
              </DialogTrigger>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProject;
