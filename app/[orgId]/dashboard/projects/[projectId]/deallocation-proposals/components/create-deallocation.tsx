"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"
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
import { SuggestedEmployee } from "@/app/[orgId]/dashboard/projects/[projectId]/types/teamfinder-types";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  reason: z.string().min(1),
});

interface Props {
  employee: SuggestedEmployee
}

export const CreateDeallocation = ({ employee }: Props) => {
  const { orgId, projectId } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_URL!;
  const { data: session } = useSession();

  //@ts-ignore
  const token = session?.user?.access_token;

  const createDeallocationUrl = `/organizations/${orgId}/projects/${projectId}/employee/${employee.id}/deallocation`;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema> | any) => {
    await fetch(apiKey + createDeallocationUrl, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }
    }).then(() =>
      toast({
        title: "Successfully created deallocation",
        duration: 1500
      }))
    form.reset()
    form.clearErrors()
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create deallocation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-4 font-bold">Propose deallocation for {employee.name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deallocation reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type a reason why you no longer want this employee..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <DialogTrigger asChild> */}
            <Button type="submit">Create deallocation</Button>
            {/* </DialogTrigger> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
