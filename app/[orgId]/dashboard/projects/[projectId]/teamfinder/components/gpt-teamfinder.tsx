"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const FormSchema = z.object({
  prompt: z.string().optional()
})

interface Props {
  onSubmit: (data: z.infer<typeof FormSchema> | any) => void
}

export function GptTeamFinderForm({ onSubmit }: Props) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-between gap-2 mb-4">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Additional context</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add additional context to your request to GPT"
                    className="resize-none"
                    rows={4}
                    cols={50}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
      </div>
      <Button type="submit">AI generate team</Button>
    </form>
    </Form >
  )
}
