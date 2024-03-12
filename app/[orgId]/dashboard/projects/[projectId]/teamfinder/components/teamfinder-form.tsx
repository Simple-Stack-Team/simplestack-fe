"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  includePartiallyAvailable: z.boolean().default(false).optional(),
  includeCloseToFinish: z.boolean().default(false).optional(),
  includeUnavailable: z.boolean().default(false).optional(),
  includePastProjects: z.boolean().default(false).optional(),
  deadlineWeeks: z.string().optional()
})

interface Props {
  onSubmit: (data: z.infer<typeof FormSchema> | any) => void
}

export function TeamFinderForm({onSubmit}: Props) {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      includeCloseToFinish: false,
      includePartiallyAvailable: false,
      includePastProjects: false,
      includeUnavailable: false,
      deadlineWeeks: '',
    },
  })

  function localOnSubmit(data: z.infer<typeof FormSchema> | any) {
    data = {
      ...data,
      deadlineWeeks: data.includeCloseToFinish ? parseInt(data.deadlineWeeks!) : 2
    }
    
    if(data.includeCloseToFinish) {
      if(!data.deadlineWeeks)
        return toast({title: 'Deadline weeks cannot be empty', variant: 'destructive'})
      if(parseInt(data.deadlineWeeks!)<2 || parseInt(data.deadlineWeeks!)>6)
        return toast({title: 'Deadline weeks must be between 2 and 6', variant: 'destructive'}) 
    }
    
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(localOnSubmit)} className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <FormField
            control={form.control}
            name="includePartiallyAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Include partially available
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="includeCloseToFinish"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Include from projects clost to finish
                  </FormLabel>
                  {
                    field.value ? 
                      <FormDescription className="!mt-3">
                        <FormField
                          control={form.control}
                          name="deadlineWeeks"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deadline weeks</FormLabel>
                              <FormControl>
                                <Input placeholder="Between 2 and 6" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </FormDescription>
                    : null
                  }
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="includeUnavailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Include unavailable
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="includePastProjects"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Include past projects roles or skills
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Find team</Button>
      </form>
    </Form>
  )
}
