'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { authFetcher } from '@/utilities/fetcher'
import Link from 'next/link'
import getData from '@/utilities/getUserData'

const FormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First Name must be at least 2 characters.'
    }),
    lastName: z.string().min(6, {
      message: 'Last Name must be at least 6 characters.'
    }),
    username: z.string().min(4, {
      message: 'Username must be at least 4 characters.'
    }),
    phoneNum: z.string().min(10, {
      message: 'Phone Number must be at least 10 characters.'
    }),
    profilePic: z.string().optional(),
    birthDate: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: 'Birth Date must be a valid date.'
    }),
    email: z.string().email({
      message: 'Email must be a valid Email.'
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.'
    }),
    passwordConfirm: z.string().min(6, {
      message: 'Password Confirm must be at least 6 characters.'
    }),
    gender: z.enum(['MALE', 'FEMALE'], {
      message: 'Gender must be either Male or Female'
    })
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match'
  })

export default function RegisterPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      phoneNum: '',
      birthDate: '',
      email: '',
      password: '',
      passwordConfirm: '',
      gender: 'MALE'
    }
  })

  const { setError, clearErrors } = form
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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    clearErrors()
    const res = await authFetcher({ body: data, action: 'register' })
    const resJson = res.data
    console.log(resJson)
    if (res.status === 'success') {
      router.push('/login')
    } else {
      console.log(res)
      if (res.error === 'Email is already in use') setError('email', { message: res.error })
      if (res.error === 'Username is already in use') setError('username', { message: res.error })
      if (res.error === 'Phone Number is already in use') setError('phoneNum', { message: res.error })
      if (res.error === 'User must be 9+ years old') setError('birthDate', { message: res.error })
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-secondary'>
  <div className='w-8/12 sm:w-8/12 md:w-6/12 lg:w-6/12 xl:w-5/12 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
    <h2 className='text-primary border-b text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5'>
      Sign Up
    </h2>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:space-x-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='text' placeholder='First Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='text' placeholder='Last Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:space-x-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='text' placeholder='Username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='text' placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:space-x-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='password' placeholder='Confirm Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:space-x-4'>
          <FormField
            control={form.control}
            name='profilePic'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='file' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNum'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='text' placeholder='Phone Number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:space-x-4'>
          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input type='date' placeholder='Birth Date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex justify-evenly items-center w-full'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='MALE' />
                      </FormControl>
                      <FormLabel className='font-normal'>Male</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='FEMALE' />
                      </FormControl>
                      <FormLabel className='font-normal'>Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className='my-1 mx-1'>
          <Link
            href='http://localhost:3001/login'
            className='text-senary text-xs hover:text-primary hover:shadow-2xl'
          >
            already have an account? Log in
          </Link>
        </div>

        <div className='flex justify-end'>
          <Button className='bg-primary hover:border-senary m-1' type='submit'>
            Sign Up
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
