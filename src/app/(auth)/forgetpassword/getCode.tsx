'use client'
import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authFetcher } from '@/utilities/fetcher'
import getData from '@/utilities/getUserData'

const CodeFormSchema = z.object({
  code: z.string().min(6, {
    message: 'Code must be at least 6 characters.'
  })
})

export default function GetCode({ email }: { email: string }) {
  const form = useForm<z.infer<typeof CodeFormSchema>>({
    resolver: zodResolver(CodeFormSchema),
    defaultValues: {
      code: ''
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

  const onSubmit = async (data: z.infer<typeof CodeFormSchema>) => {
    console.log(data)

    const res = await authFetcher({ body: { code: data.code, email: email }, action: 'password/verifycode' })

    if (res.status === 'success') {
      router.push('/resetpassword' + `?email=${email}&code=${data.code}`)
    } else {
      setError(res.error)
    }
  }

  return (
    <div className='flex justify-center w-full items-center min-h-screen bg-secondary'>
      <div className='w-full flex items-center justify-center'>
        <div className='w-9/12 sm:w-6/12 md:w-6/12 lg:w-4/12 xl:w-3/12 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
          <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-5'>
            Enter Code
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormItem>
                <FormLabel htmlFor='code'>Code</FormLabel>
                <Input type='text' id='code' placeholder='Code' {...register('code')} />
                {errors && <FormMessage>{error}</FormMessage>}
              </FormItem>
              <Button className='bg-primary hover:border-senary m-1' type='submit'>
                Submit
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
