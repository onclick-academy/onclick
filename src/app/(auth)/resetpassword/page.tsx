'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authFetcher } from '@/utilities/fetcher'
import getData from '@/utilities/getUserData'

const FormSchema = z.object({
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  })
})

export default function ResetPasswordPage() {
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
    <div>
      <div className='flex justify-center items-center h-screen bg-secondary'>
        <div className='w-96 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
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
