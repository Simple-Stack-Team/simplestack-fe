"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formSchema } from "@/app/[orgId]/dashboard/skills/new/_constants/SkillsFormSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { Checkbox } from "@/components/ui/checkbox";

type Category = {
  id: string;
  name: string;
};

const UpdateSkillPage = () => {
  const searchParams = useSearchParams();
  const description = searchParams.get("des");
  const name = searchParams.get("name");
  const framework = searchParams.get("framework");

  const { status, data: session } = useSession();
  const router = useRouter();
  const { orgId, skillId } = useParams();

  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const url = `/organizations/${orgId}/skills/skill-categories`;

  const { data } = useFetch({ apiKey, url });

  //@ts-ignore
  const authorName = session?.user?.user.name;
  console.log(session);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: authorName as string,
      name: name as string,
      description: description as string,
      skillCategoryId: framework as string,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (status === "loading") return;

    //@ts-ignore
    const token = session?.user?.access_token;
    //@ts-ignore
    const authorId = session?.user?.user.sub;

    try {
      const res = await fetch(
        `${apiKey}/organizations/${orgId}/skills/update-skill/${skillId}/author/${authorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(values),
        },
      );

      if (res.ok) {
        router.refresh();
        router.push(`/${orgId}/dashboard/skills`);
      }
    } catch {
      console.log("Something went wrong");
    }
  }

  return (
    <div className="max-w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="skillCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Framework" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.map((category: Category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill name</FormLabel>
                <FormControl>
                  <Input placeholder="UX Designer" {...field} />
                </FormControl>
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
                  <Textarea
                    placeholder="Type your description here."
                    id="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isChecked"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl className="mt-[2px]">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Add skill to your department</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update skill</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateSkillPage;
