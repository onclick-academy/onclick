'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authFetcher, fetcher } from '@/utilities/fetcher'
import Link from 'next/link'
import getData from '@/utilities/getUserData'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid Email.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  isRememberMe: z.boolean()
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      isRememberMe: false
    }
  })

  const [userData, setUserData] = useState({} as any)
  const router = useRouter()

  useEffect(() => {
    const fetching = async () => {
      const data = await getData()
      setUserData(data)
    }

    fetching()
  }, [])
  if (userData.status === 'success') {
    router.push('/')
  }

  const [loginError, setLoginError] = useState('')

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)

    const res = await authFetcher({ body: data, action: 'login', isRememberMe: data.isRememberMe })

    const resJson = res.data
    console.log(resJson)
    if (res.status === 'success') {
      router.push('/')
    } else {
      setLoginError('Email or pasword is incorrect')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-secondary'>
    <div className='w-9/12 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
    <h2 className='text-primary border-b text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5'>
      Login
    </h2>
    <Form {...form}>
      {loginError && <FormDescription className='text-red-500'>{loginError}</FormDescription>}
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <FormItem className='my-auto'>
            <Checkbox
              id='isRememberMe'
              onClick={() => {
                form.setValue('isRememberMe', !form.getValues('isRememberMe'));
              }}
            />
            <label
              htmlFor='isRememberMe'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-1'
            >
              Remember Me
            </label>
          </FormItem>

          <Link
            href='http://localhost:3001/forgetpassword'
            className='text-senary text-xs hover:text-primary hover:shadow-2xl'
          >
            forget your password?
          </Link>
        </div>

        <div className='flex justify-end'>
          <Button className='bg-primary hover:border-senary m-1' type='submit'>
            Login
          </Button>
          <Button className='bg-secondary hover:bg-senary m-1' type='button' onClick={() => router.push('/')}>
            {' '}
            Cancel{' '}
          </Button>
        </div>
      </form>
    </Form>
  </div>
</div>

  )
}
