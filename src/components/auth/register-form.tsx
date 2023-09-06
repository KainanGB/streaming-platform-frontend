import Link from "next/link"
import { useRouter } from "next/navigation"
import { userFormSchema } from "@/utils/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { axiosDefault } from "@/lib/axios"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { ToastAction } from "../ui/toast"
import { useToast } from "../ui/use-toast"

export const RegisterForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      await axios.post("/api/register", {
        ...values,
      })

      return toast({
        title: "Congrats! you're in.",
        action: (
          <ToastAction
            altText="Your has been succesfully created."
            onClick={() => router.push("/login")}
          >
            Go explore!
          </ToastAction>
        ),
      })
    } catch (err) {
      const error = err as AxiosError
      return toast({
        title: error.response?.data.message,
        action: (
          <ToastAction
            altText="Go explore!"
            onClick={() => router.push("/login")}
          >
            Go explore!
          </ToastAction>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>

              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" />
            <label
              htmlFor="remember-me"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Link
            className="text-sm font-medium leading-none cursor-pointer border-b border-transparent hover:border-neutral-400"
            href="/login/reset-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="w-full" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  )
}
