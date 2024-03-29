"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  period: z.string().min(1),
  startDate: z.date({
    required_error: "Required.",
  }),
  deadlineDate: z
    .date({
      required_error: "Required.",
    })
    .optional(),
  status: z.string().min(1),
  description: z.string().min(2),
  technologyStack: z.object({ technology: z.string().min(2) }).array(),
  teamRoles: z
    .object({
      teamroleId: z.string().min(2),
      nrOfMembers: z.coerce.number(),
    })
    .array(),
});

interface Props {
  params: { orgId: string };
}
const CreateProject = ({ params: { orgId } }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technologyStack: [{ technology: "" }],
      teamRoles: [{ teamroleId: "", nrOfMembers: 0 }],
    },
  });

  const { data } = useFetchTeamRoles(orgId);

  const { control, register, watch } = form;
  const period = watch("period"); // Get the value of the "period" field

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

  const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/projects`;

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

    // @ts-ignore
    const token = session.user?.access_token;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      router.push(`/${orgId}/dashboard/projects`);
    }
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
                          disabled={form.getValues("period") === "ongoing"}
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
          )}
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Not Started">Not started</SelectItem>
                  <SelectItem value="Starting">Starting</SelectItem>
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
                {fields.map((field, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Name"
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
                    key={item.id}
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
                key="a"
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
