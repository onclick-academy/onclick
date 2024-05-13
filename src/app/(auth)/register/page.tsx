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
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'


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
  profilePic: z.string(),
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
      gender: 'MALE' || 'FEMALE'
    }
  })

  const [error, setError] = useState('')
  const [date, setDate] = useState<Date>()
  const [emailError, setEmailError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [phoneNumError, setPhoneNumError] = useState('')
  const [birthDateError, setBirthDateError] = useState('')
  const [profilePicError, setProfilePicError] = useState('') // TODO

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data)

    if (data.password !== data.passwordConfirm) {
      setError('Passwords do not match')
      return
    }
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
      console.log(res)
      if (res.error === 'Email is already in use') setEmailError(res.error)
        else setEmailError('')
      if (res.error === 'Username is already in use') setUsernameError(res.error)
        else setUsernameError('')
      if (res.error === 'Phone Number is already in use') setPhoneNumError(res.error)
        else setPhoneNumError('')
      if (res.error === 'User must be 9+ years old') setBirthDateError(res.error)
        else setBirthDateError('')
    }
  }

  // localStorage && localStorage.getItem('accessToken') ? router.push('/') : null

  return (
    <div className='flex justify-center items-center h-screen bg-secondary'>
      <div className='w-4/12 flex flex-col border-1 border-quinary bg-white rounded-lg p-4 shadow-lg bg-secondary'>
        <h2 className='scroll-m-20 text-primary border-b text-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5'>
          Sign Up
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-3/3 space-y-6'>
            <div className='flex justify-between'>
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
                      <Input type='text' placeholder='Last Name' className='ms-2' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input type='text' placeholder='Username' {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm font-medium text-destructive'>{usernameError}</p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input type='text' placeholder='Email' className='ms-2' {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm font-medium text-destructive'>{emailError}</p>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-between'>
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
                      <Input type='password' placeholder='Confirm Password' className='ms-2' {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm font-medium text-destructive'>{error}</p>
                  </FormItem>
                )}
              />
            </div>

            <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='profilePic'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input type='file' {...field}/>
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm font-medium text-destructive'>{profilePicError}</p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phoneNum'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input type='text' placeholder='Phone Number' className='ms-2' {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className='text-sm font-medium text-destructive'>{phoneNumError}</p>
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
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
            /> */}

            <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='birthDate'
                render={({ field }) => (
                  <FormItem className='w-full'>
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
                    <p className='text-sm font-medium text-destructive'>{birthDateError}</p>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem className='flex items-center space-y-3 w-full'>
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
              <a href='http://localhost:3001/login' className='text-senary text-xs hover:text-primary hover:shadow-2xl'>
                already have an account? Log in
              </a>
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
