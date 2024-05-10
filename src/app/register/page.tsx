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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const FormSchema = z.object({
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

  birthDate: z.string().date(),
  email: z.string().email({
    message: 'Email must be a valid Email.'
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  passwordConfirm: z.string().min(6, {
    message: 'Password must be at least 6 characters.'
  }),
  gender: z.enum(['MALE', 'FEMALE'], {
    message: 'gender must be either Male or Female'
  }),
  educationLevel: z.enum(['ELEMENTARY', 'MIDDLE', 'HIGH', 'COLLEGE', 'UNIVERSITY', 'MASTER', 'PHD'], {
    message: 'education level must be either Elementary, Middle, High, College, University, Master, or PHD'
  })
})

export default function LoginPage() {
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
      gender: 'MALE' || 'FEMALE',
      educationLevel: 'COLLEGE' || 'ELEMENTARY' || 'MIDDLE' || 'HIGH' || 'UNIVERSITY' || 'MASTER' || 'PHD'
    }
  })

  const [error, setError] = useState('')
  const [date, setDate] = useState<Date>()

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)
    const res = await fetch('http://localhost:3000/api/v1/auth/register', {
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
      router.push('/login')
    } else {
      setError('Email or pasword is incorrect')
    }
  }

//   localStorage && localStorage.getItem('accessToken') ? router.push('/') : null

  return (
    <div className='flex justify-center items-center h-screen bg-secondary'>
      <div className='w-96 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
        <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5'>
          Sign Up
        </h2>
        <Form {...form}>
          {error && <FormDescription className='text-red-500'>{error}</FormDescription>}
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-3/3 space-y-6'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='text'  placeholder='First Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='text' placeholder='Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormControl>
                    <Input type='text' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNum'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='text' placeholder='Phone Number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='educationLevel'
              render={({ field }) => (
                <FormItem>
                  <Select>
                    <SelectTrigger className=''>
                      <SelectValue placeholder='Education Level' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='ELEMENTARY'>Elementary</SelectItem>
                      <SelectItem value='MIDDLE'>Middle</SelectItem>
                      <SelectItem value='HIGH'>High</SelectItem>
                      <SelectItem value='COLLEGE'>College</SelectItem>
                      <SelectItem value='UNIVERSITY'>University</SelectItem>
                      <SelectItem value='MASTER'>Master</SelectItem>
                      <SelectItem value='PHD'>PHD</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <Select>
                    <SelectTrigger className=''>
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='MALE'>Male</SelectItem>
                      <SelectItem value='FEMALE'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input type='date' placeholder='Birth Date' {...field} />
                    </FormControl>
                  {/* <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={'outline'} className={cn('w-full', !date && 'text-muted-foreground')}>
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {date ? format(date, 'PPP') : <span>Birth Date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='Confirm Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <a href='http://localhost:3001/login' className='text-senary text-xs hover:text-primary hover:shadow-2xl'>
              already have an account? Log in
            </a>

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
