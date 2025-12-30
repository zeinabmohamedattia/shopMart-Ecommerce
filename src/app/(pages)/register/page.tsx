'use client'
import  { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useRouter  } from 'next/navigation'
import { Loader } from 'lucide-react'
import { signUp } from './_action/register.action'
import Link from 'next/link'
import { FormFields, registerSchema } from '@/schemas/register'


export default function Register() {
    const router=useRouter()
  const [apiError, setApiError] = useState<null|string>(null)
    const [isLoading, setIsLoading] = useState(false)
  
    // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
    
  
    // 2. Define a submit handler.
    async function onSubmit(values: FormFields) {
    setIsLoading(true)
      const data = await signUp(values)
      
      if (data.message == 'success') {
        router.push('/login')
      } else {
        setApiError(data.message)
      }
      setIsLoading(false)
    }
  return <>
    <div className='flex flex-col justify-center items-center min-h-[75vh]'>
        <h1 className='my-3 text-2xl'>Register Now</h1>
  
        <Card className='p-5 w-sm'>
        <Form {...form}>
          {apiError&& (
            <h2 className="text-red-500 text-center">{apiError}</h2>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ali" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ali@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re-Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01010700701" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full cursor-pointer" disabled={isLoading} type="submit">
              {isLoading && <Loader className="animate-spin" />} Submit
            </Button>
            <p>Already have account? please, <Link href={'/login'}><span className='font-bold'>SignIn</span></Link></p>

          </form>
        </Form>

  
        </Card>
      </div>
  </>
}
