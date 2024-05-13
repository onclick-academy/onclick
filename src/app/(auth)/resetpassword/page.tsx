'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

export default function ResetPassword() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = form

  const [error, setError] = useState('')
  const router = useRouter()

  // const password = watch('password')
  // const confirmPassword = watch('confirmPassword')

  // if (password !== confirmPassword) {
  //   setError('Passwords do not match')
  // }
  // router.push('/resetpassword' + `?email=${email}&code=${data.code}`)
  const url = new URL(window.location.href)
  const email = url.searchParams.get('email')
  const code = url.searchParams.get('code')
  console.log(email)
  console.log(code)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    const res = await fetch('http://localhost:3000/api/v1/auth/password/resetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        email: email,
        code: code,
        data})
    }).then(res => res.json())
    console.log(res)

    if (res.status === 'success') {
      router.push('/login')
    } else {
      setError(res.message)
    }
  }
  
  localStorage && localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') ? router.push('/') : null
  return (
    <div>
      <h1>ResetPassword</h1>

      <div className='flex justify-center items-center h-screen bg-secondary'>
        <div className='w-96 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormItem>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input type='password' id='password' placeholder='Password' {...register('password')} />
                {errors && <FormMessage>{error}</FormMessage>}
              </FormItem>
              <FormItem>
                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                <Input
                  type='password'
                  id='confirmPassword'
                  placeholder='Confirm Password'
                  {...register('confirmPassword')}
                />
                {errors && <FormMessage>{error}</FormMessage>}
              </FormItem>
              <Button className='bg-primary hover:border-senary m-1' type='submit'>
                Reset
              </Button>
              <Button className='bg-secondary hover:bg-senary m-1' type='button' onClick={() => router.push('/')}>
                {' '}
                Cancel{' '}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
