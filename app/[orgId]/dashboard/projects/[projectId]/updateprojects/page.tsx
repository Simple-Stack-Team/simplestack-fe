"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import useFetchTeamRoles from "@/hooks/useFetchTeamRoles";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  period: z.string().min(1),
  startDate: z
    .date({
      required_error: "Required.",
    })
    .optional(),
  deadlineDate: z
    .date({
      required_error: "Required.",
    })
    .optional()
    .nullable(),

  status: z.string().min(1),
  description: z.string().min(2).max(200),
  technologyStack: z
    .object({
      technology: z.string({
        required_error: "Required.",
      }),
    })
    .array(),
  teamRoles: z
    .object({ teamroleId: z.string(), nrOfMembers: z.coerce.number() })
    .array(),
});

interface Props {
  params: { orgId: string; projectId: string };
}

type TeamRole = {
  teamroleId: string;
  nrOfMembers: number;
};

type ProjectFormValues = {
  name: string;
  period: string;
  startDate: string;
  deadlineDate?: string | null;
  status: string;
  description: string;
  technologyStack: string[];
  teamRoles: TeamRole[];
};

const CreateProject = ({ params: { orgId, projectId } }: Props) => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectFormValues>();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technologyStack: [{ technology: "" }],
      teamRoles: [{ teamroleId: "", nrOfMembers: 0 }],
      period: project?.period,
      status: project?.status,
    },
  });
  console.log(project?.period);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects/${projectId}`;

  // @ts-ignore
  const token = session.user?.access_token;
  useEffect(() => {
    async function getProjectsDetails() {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("API Response:", data);
          data.startDate = new Date(data.startDate);
          data.deadlineDate = data.deadlineDate
            ? new Date(data.deadlineDate)
            : null;
          setProject(data);
          form.reset(data);
        } else {
          console.error(res.status);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }

    getProjectsDetails();
  }, [url, token, form]);
  const { data } = useFetchTeamRoles(orgId);

  const { control, register, watch, setValue } = form;
  const period = watch("period");
  const { fields, append, remove } = useFieldArray({
    name: "technologyStack",
    control,
  });
  const {
    fields: teamRolesFields,
    append: teamRolesAppend,
    remove: teamRolesRemove,
  } = useFieldArray({
    name: "teamRoles",
    control,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const technologyStack = data.technologyStack
      .filter((el) => el.technology.length > 0)
      .map((el) => el.technology);
    data = {
      ...data,
      technologyStack: technologyStack as any,
      teamRoles: data.teamRoles.filter(
        (el) => el.teamroleId.length > 0 && el.nrOfMembers > 0,
      ),
    };
    if (data.period === "Ongoing") {
      delete data.deadlineDate;
    }
    if (data.period === "Ongoing") {
      data.deadlineDate = null;
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push(`/${orgId}/dashboard/projects`);
    }
    console.log(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] space-y-3"
      >
        <div className="flex items-center justify-between gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Period</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent {...field}>
                    <SelectItem value="Fixed">Fixed</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {period === "Fixed" && (
            <FormField
              control={form.control}
              name="deadlineDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(date);
                          setValue("deadlineDate", date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not Started">Not started</SelectItem>
                  <SelectItem value="Starting">Starting</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closing">Closing</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="About project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technologyStack"
          render={({ field }) => (
            <div className="flex items-end gap-4">
              <FormItem className="flex-1">
                <FormLabel>Technology Stack</FormLabel>
                {data &&
                  fields.map((fields, index) => {
                    return (
                      <div key={fields.id} className="flex items-center gap-2">
                        <Input
                          placeholder="Name"
                          value={project?.technologyStack[index]}
                          {...register(
                            `technologyStack.${index}.technology` as const,
                          )}
                        />
                        {index > 0 && (
                          <Button
                            onClick={() => remove(index)}
                            variant="ghost"
                            size="icon"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    );
                  })}
                <FormMessage />
                <Button
                  className="bg-gray-500"
                  type="button"
                  onClick={() => append({ technology: "" })}
                >
                  <LuPlus />
                </Button>
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="teamRoles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team roles</FormLabel>
              {teamRolesFields.map((item, index) => {
                return (
                  <FormField
                    control={form.control}
                    name={`teamRoles.${index}.teamroleId`}
                    render={({ field }) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select one" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data &&
                              data.map((role) => (
                                <SelectItem key={role.name} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormControl>
                          <Input
                            type="number"
                            {...register(
                              `teamRoles.${index}.nrOfMembers` as const,
                            )}
                          />
                        </FormControl>
                        {index > 0 && (
                          <Button
                            onClick={() => teamRolesRemove(index)}
                            variant="ghost"
                            size="icon"
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </div>
                    )}
                  ></FormField>
                );
              })}
              <Button
                className="bg-gray-500"
                type="button"
                onClick={() =>
                  teamRolesAppend({ teamroleId: "", nrOfMembers: 0 })
                }
              >
                <LuPlus />
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProject;
