'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

  const [loginError, setLoginError] = useState('')

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    console.log(res)

    const resJson = res.data
    console.log(resJson)
    if (res.status === 'success') {
      router.push('/')
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      localStorage.setItem('userId', resJson.id)
    } else {
      setLoginError('Email or pasword is incorrect')
    }
  }

  localStorage && localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') ? router.push('/') : null
  return (
    <div className='flex justify-center items-center h-screen bg-secondary'>
      <div className='w-96 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
        <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5'>
          Login
        </h2>
        <Form {...form}>
          {loginError && <FormDescription className='text-red-500'>{loginError}</FormDescription>}
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-3/3 space-y-6'>
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

            <FormItem className='my-auto ms-0'>
              <Checkbox
                id='isRememberMe'
                onClick={() => {
                  {
                    form.setValue('isRememberMe', !form.getValues('isRememberMe'))
                  }
                }}
              />
              <label
                htmlFor='isRememberMe'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 px-1'
              >
                Remember Me
              </label>
            </FormItem>
            {/* <a href="http://localhost:3001/auth/forgetpassword">forget your password?</a> */}

            <a
              href='http://localhost:3001/forgetpassword'
              className='text-senary text-xs hover:text-primary hover:shadow-2xl'
            >
              forget your password?
            </a>

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
