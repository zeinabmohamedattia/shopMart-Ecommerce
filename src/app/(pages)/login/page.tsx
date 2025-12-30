'use client'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import {  Loader } from 'lucide-react'
import { FormFields, loginSchema } from '@/schemas/loginSchema'
import Link from 'next/link'


export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  let searchParams = useSearchParams()

  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: '/',
      redirect: true
    })
    setIsLoading(false)
  }
  return <>
    <div className='flex flex-col justify-center items-center min-h-[75vh]'>
      <h1 className='my-3 text-2xl'>Login Now</h1>

      <Card className='p-5 w-sm'>
        <Form {...form}>
          {searchParams.get('error') && <h2 className='text-red-500'>{searchParams.get('error')}</h2>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="ali@example.com" {...field} />
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
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input  {...field} placeholder='********'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full cursor-pointer' disabled={isLoading} type="submit">{isLoading && <Loader className='animate-spin' />} Login</Button>
            <p>you don't have account? please, <Link href={'/register'}><span className='font-bold'>SignUp</span></Link></p>
          </form>
        </Form>

      </Card>
    </div>
  </>
}
