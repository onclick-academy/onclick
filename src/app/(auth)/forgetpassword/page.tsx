'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import GetCode from './getCode'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Email must be a valid Email.'
  })
})

const FormCodeSchema = z.object({
  code: z.string().min(6, {
    message: 'Code must be at least 6 characters.'
  })
})

export default function ForgetPasswordPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ''
    }
  })


  const { handleSubmit, control, watch, setValue } = useForm<z.infer<typeof FormCodeSchema>>({
    resolver: zodResolver(FormCodeSchema),
    defaultValues: {
      code: ''
    }
  })

  const [loginError, setLoginError] = useState('')
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setEmail(data.email)
    const res = await fetch('http://localhost:3000/api/v1/auth/password/forgetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    console.log(res)

    const resJson = res.data

    if (res.status === 'success') {
      // TODO
      window.alert('An email has been sent to your email address. Please check your email to reset your password.')
      setSuccess(true)
    } else {
      setLoginError('The Email You Enetered is not registered with us. Please try again.')
    }
  }

  localStorage && localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') ? router.push('/') : null
  return (
    <div className='flex justify-center items-center h-screen bg-secondary'>
      {!success ? (
        <div className='w-96 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
          <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-5'>
            Enter your email
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

              <div className='flex justify-end'>
              <Button className='bg-primary hover:border-senary m-1' type='submit'>
                Send
              </Button>
                <Button className='bg-secondary hover:bg-senary m-1' type='button' onClick={() => router.push('/')}>
                {' '}
                Cancel{' '}
              </Button>
              </div>
            </form>
          </Form>
        </div>
      ) :
      <GetCode email={email} />}
    </div>
  )
}
