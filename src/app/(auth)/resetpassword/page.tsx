'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authFetcher } from '@/utilities/fetcher'
import getData from '@/utilities/getUserData'
import LoadingSpinner from '@/app/loading'

const FormSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

function ResetPasswordPageComponent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })

  const {
    register,
    formState: { errors }
  } = form

  const [error, setError] = useState('')
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

  const params = useSearchParams()
  const email = params.get('email')
  const code = params.get('code')
  console.log(email)
  console.log(code)

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    if (data.password !== data.confirmPassword) {
      setError('Password does not match')
      console.log('Password does not match')
      return
    }
    const res = await authFetcher({ body: { email: email, code: code, data }, action: 'password/resetpassword' })

    console.log(res)

    if (res.status === 'success') {
      router.push('/login')
    } else {
      setError(res.message)
    }
  }
  return (
    <div className='flex justify-center w-full items-center min-h-screen bg-secondary'>
      <div className='w-full flex items-center justify-center'>
        <div className='w-9/12 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
          <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5'>
            Reset Password
          </h2>
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordPageComponent />
    </Suspense>
  )
}
