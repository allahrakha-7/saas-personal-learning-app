"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  voice: z.string().min(1, { message: "Voice is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  duration: z.coerce
    .number()
    .min(15, { message: "Duration must be at least 15 minute" }),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const subjects = [
    "maths",
    "language",
    "science",
    "history",
    "coding",
    "economics",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the companion name"
                  {...field}
                  className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full"
                />
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="!border-black text-black focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Select the subject" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject}
                        value={subject}
                        className="bg-white capitalize">
                          {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should this companion teach?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the topic you want to learn - ex:English Literature"
                  {...field}
                  className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full resize-none"
                  maxLength={500}
                />
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="!border-black text-black focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                      <SelectItem value="male">
                        Male
                      </SelectItem>

                      <SelectItem value="female">
                        Female
                      </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speaking Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="!border-black text-black focus-visible:!ring-0 focus-visible:!border-black !w-full capitalize">
                    <SelectValue placeholder="Select the voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                      <SelectItem value="formal">
                        Formal
                      </SelectItem>

                      <SelectItem value="casual">
                        Casual
                      </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="15"
                  {...field}
                  className="!border-black !bg-white focus-visible:!ring-0 focus-visible:!border-black !w-full"
                  />
              </FormControl>
              <FormMessage className="text-red-600"/>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-black text-white w-full cursor-pointer">Build Your Companion</Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
