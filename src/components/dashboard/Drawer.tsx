import * as React from 'react'
import replace from '../../Img/replace.jpg'
import { IoMdCloseCircle } from 'react-icons/io'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'

export default function DrawerDemo(props: Data) {
  const {
    title,
    description,
    photo,
    price,
    CourseOwners,
    certificate,
    InstructorId,
    username,
    firstName,
    lastName,
    bio,
    phone,
    component
  } = props

  interface CourseProps {
    title?: string
    description?: string
    certificate?: boolean
    CourseOwners?: string
    price?: number
  }

  interface InstructorProps {
    InstructorId?: string
    firstName?: string
    lastName?: string
    bio?: string
    phone?: string
  }

  const courseProps: CourseProps = {
    title,
    description,
    certificate,
    CourseOwners: CourseOwners?.map(el => el.id).join(', '),
    price
  }

  const instructorProps: InstructorProps = {
    InstructorId,
    firstName,
    lastName,
    bio: bio?.slice(0, 40),
    phone
  }

  const renderProps = (propsObject: CourseProps | InstructorProps) => {
    return (
      <div className='flex gap-8 items-center mt-8 text-nowrap'>
        <div className='flex flex-col gap-4'>
          {Object.keys(propsObject).map(key => (
            <h2 key={key} className='text-md font-normal capitalize'>
              {key}:
            </h2>
          ))}
        </div>
        <div className='flex flex-col gap-5 capitalize text-nowrap'>
          {Object.values(propsObject).map((value, index) => (
            <p key={index} className='text-sm font-normal capitalize'>
              {value}
            </p>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <h1 className='cursor-pointer'>{`${component === 'course' ? title : username}`}</h1>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-4xl'>
          <DrawerHeader>
            <DrawerTitle>{component === 'course' ? 'Course' : 'Instructor'}</DrawerTitle>
          </DrawerHeader>
          <div className='p-4 pb-0 flex justify-start gap-12 w-full'>
            <div className=''>
              <Image src={replace} alt={'none'} width={400} height={400} className='rounded-lg border shadow-md' />
            </div>
            <div className='flex flex-col gap-4'>
              {component === 'course'
                ? renderProps(courseProps)
                : component === 'instructor'
                  ? renderProps(instructorProps)
                  : null}
            </div>
          </div>
          <DrawerFooter className='bg flex flex-row justify-center'>
            <DrawerClose asChild>
              <Button variant='link' className='w-1/6'>
                <IoMdCloseCircle className='text-4xl text-septenary hover:text-primary transition-all duration-75' />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface Data {
  title?: string
  id?: string
  description?: string
  photo: string
  price?: number
  CourseOwners?: { id: string }[]
  InstructorId?: string
  certificate?: boolean
  gender?: string
  component?: string
  username?: string
  firstName?: string
  lastName?: string
  bio?: string
  phone?: string
}
