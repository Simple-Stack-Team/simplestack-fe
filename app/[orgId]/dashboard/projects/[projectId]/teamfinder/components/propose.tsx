"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Assignment,
  EmployeeProject,
  SuggestedEmployee,
  TeamRole,
} from "@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types";
import { toast } from "@/components/ui/use-toast";
import useFetch from "@/hooks/useFetch";

const FormSchema = z.object({
  workHours: z.string({
    required_error: "Please select work hours.",
  }),
  comments: z.string().min(1),
  teamRoles: z.string().array().min(1),
});

interface Props {
  employee: SuggestedEmployee;
}

export const ProposeEmployee = ({ employee }: Props) => {
  const { orgId, projectId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const { status, data: session } = useSession();
  //@ts-ignore
  const token = session?.user?.access_token;

  const url = `/organizations/${orgId}/teamroles`;
  const projectsUrl = `/organizations/${orgId}/projects/employee/${employee.id}`;
  const createAssignmentUrl = `/organizations/${orgId}/projects/${projectId}/employee/${employee.id}/assignment`;

  const { data, loading, error } = useFetch({ apiKey, url });
  const {
    data: projects,
    loading: loadingProjects,
    error: errorProjects,
  } = useFetch({ apiKey, url: projectsUrl });

  let totalHours = 0;
  if (!!projects.currentProjects)
    totalHours = projects.currentProjects.reduce(
      (totalHours: number, project: EmployeeProject) =>
        totalHours + project.workHours,
      0,
    );
  const [teamRoles, setTeamRoles] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teamRoles,
    },
  });

  const handleSelectOption = (option: string) => {
    setTeamRoles((prevRoles) => {
      if (prevRoles.includes(option)) {
        form.setValue(
          "teamRoles",
          prevRoles.filter((role) => role !== option),
        );
        return prevRoles.filter((role) => role !== option);
      } else {
        form.setValue("teamRoles", [...prevRoles, option]);
        return [...prevRoles, option];
      }
    });
  };

  const onSubmit = async (values: z.infer<typeof FormSchema> | any) => {
    values = {
      ...values,
      workHours: parseInt(values.workHours!),
    };

    await fetch(process.env.NEXT_PUBLIC_API_URL! + createAssignmentUrl, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(() =>
      toast({
        title: "Successfully proposed member",
        duration: 1500,
      }),
    );
    form.clearErrors();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={employee.assignmentProposal.some(
            (assignment: Assignment) => assignment.employeeId === employee.id,
          )}
        >
          {employee.assignmentProposal.some(
            (assignment: Assignment) => assignment.employeeId === employee.id,
          )
            ? "Proposed"
            : "Propose"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 font-bold">
            Propose {employee.name}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="workHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work hours</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work hours 1-8" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from(
                        { length: 8 - totalHours },
                        (_, index) => index,
                      ).map((index) => (
                        <SelectItem value={`${index + 1}`} key={index}>
                          {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="teamRoles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team roles</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild className="w-full justify-start">
                      <Button variant="outline" size="sm" className="h-9">
                        {teamRoles?.length > 0 ? (
                          <>
                            <div className="hidden space-x-1 lg:flex">
                              {teamRoles.length > 4 ? (
                                <Badge className="rounded-lg px-1 font-normal">
                                  {teamRoles.length} selected
                                </Badge>
                              ) : (
                                data.teamRoles
                                  .filter((option: TeamRole) =>
                                    teamRoles.includes(option.name),
                                  )
                                  .map((option: TeamRole) => (
                                    <Badge
                                      key={option.id}
                                      className="rounded-lg px-1 font-normal"
                                    >
                                      {option.name}
                                    </Badge>
                                  ))
                              )}
                            </div>
                          </>
                        ) : (
                          <p className="text-sm font-normal text-slate-500">
                            Select team roles from the list
                          </p>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search team roles" />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            {data.teamRoles.map((option: TeamRole) => {
                              const isSelected = teamRoles.includes(
                                option.name,
                              );
                              return (
                                <CommandItem
                                  key={option.id}
                                  onSelect={() =>
                                    handleSelectOption(option.name)
                                  }
                                  className="cursor-pointer"
                                >
                                  <div
                                    className={cn(
                                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-black",
                                      isSelected
                                        ? "text-primary-foreground bg-black"
                                        : "opacity-50 [&_svg]:invisible",
                                    )}
                                  >
                                    <CheckIcon className="h-4 w-4 text-white" />
                                  </div>
                                  <span>{option.name}</span>
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Leave some comments about this proposal"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <DialogTrigger asChild> */}
            <Button type="submit">Propose</Button>
            {/* </DialogTrigger> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
