'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    watch,
    formState: { errors }
  } = form

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const codeValue = watch('code')
  const [code, setCode] = useState('')
  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof CodeFormSchema>) => {
    console.log(data)

    const res = await fetch('http://localhost:3000/api/v1/auth/password/verifycode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        code: data.code,
        email: email
      })
    }).then(res => res.json())
    console.log(res)

    if (res.status === 'success') {
      router.push('/resetpassword' + `?email=${email}&code=${data.code}`)
    } else {
      setError(res.error)
    }
  }
  localStorage && localStorage.getItem('accessToken') && localStorage.getItem('refreshToken') ? router.push('/') : null

  return (
    <div>
      <h1>GetCode</h1>
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
  )
}

//   return (
//     <div className='flex justify-center items-center h-screen bg-secondary'>
//       <div className='w-96 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
//         <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-2xl font-semibold tracking-tight first:mt-0 mb-5'>
//           Enter Code
//         </h2>
//         {loginError && <FormDescription className='text-red-500'>{loginError}</FormDescription>}
//         <form className='w-3/3 space-y-6'>
//           <FormField
//             control={control}
//             name='code'
//             render={({ field }) => (
//               <FormItem>
//                 <InputOTP
//                   maxLength={6}
//                   pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
//                   value={codeValue}
//                   onChange={(value: string) => setValue('code', value, { shouldValidate: true })}
//                   onComplete={() => setCode(codeValue)}
//                 >
//                   <InputOTPGroup>
//                     <InputOTPSlot index={0} />
//                     <InputOTPSlot index={1} />
//                     <InputOTPSlot index={2} />
//                     <InputOTPSlot index={3} />
//                     <InputOTPSlot index={4} />
//                     <InputOTPSlot index={5} />
//                   </InputOTPGroup>
//                 </InputOTP>
//               </FormItem>
//             )}
//           />
//           <div className='flex justify-end'>
//             <Button onClick={() => onSubmit()} className='bg-primary hover:bg-septenary m-1' type='submit'>
//               Send
//             </Button>
//             <Button className='hover:bg-senary m-1' type='button' onClick={() => router.push('/')}>
//               {' '}
//               Cancel{' '}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
