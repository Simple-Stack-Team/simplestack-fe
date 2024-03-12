"use client";

import { useParams, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  skill: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  level: z.string().min(1, {
    message: "You must select one",
  }),
  experience: z.string().min(2, {
    message: "You must select one",
  }),
});

const AssignSkillPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { orgId, skillId } = useParams();
  const searchParams = useSearchParams();

  const empId = searchParams.get("empId");
  const skillname = searchParams.get("skillname");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: skillname as string,
      level: "",
      experience: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    //@ts-ignore
    const token = session?.user?.access_token;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}/skills/assign-skill`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        employeeId: empId,
        skillId: skillId,
        level: parseInt(data.level),
        experience: data.experience,
      }),
    });

    if (res.ok) {
      router.push(`/${orgId}/dashboard/skillassignment`);
      router.refresh();
    } else {
      toast("Failed", {
        description: `Failed to assign the skill. Please try again.`,
        duration: 2000,
      });
    }
  }

  return (
    <div className="max-w-[500px]">
      <Toaster />
      <h1 className="mb-4 text-2xl font-semibold">Assign skill</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill</FormLabel>
                <FormControl>
                  <Input placeholder="UX Design" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level according to your knowledge" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 - Learns</SelectItem>
                    <SelectItem value="2">2 - Knows</SelectItem>
                    <SelectItem value="3">3 - Does</SelectItem>
                    <SelectItem value="4">4 - Helps</SelectItem>
                    <SelectItem value="5">5 - Teaches</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experince</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a field according to your experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0-6 months">0-6 months</SelectItem>
                    <SelectItem value="6-12 months">6-12 months</SelectItem>
                    <SelectItem value="2-4 years">2-4 years</SelectItem>
                    <SelectItem value="4-7 years">4-7 years</SelectItem>
                    <SelectItem value="More than 7 years">
                      More than 7 years
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AssignSkillPage;
