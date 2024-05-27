'use client'
import StarsRating from '@/constants/Star'
import React from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { MdOutlinePlayLesson } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { CourseProps } from '.'
import CustomImage from '@/components/CustomImage'

interface NarrowCardProps {
  course: CourseProps
}

const NarrowCard = ({ course }: NarrowCardProps) => {
  console.log('🚀 ~ file: NarrowCard.tsx ~ line 10 ~ NarrowCard ~ data', course)
  return (
    <div className='w-xl max-w-l mx-auto bg-white-100 rounded-lg shadow-md overflow-hidden'>
      <div className='relative w-full h-48'>
        <CustomImage
          src={course.photo} // Replace this with your dynamic photo source from database
          alt='Course cover'
          layout='fill'
          objectFit='cover'
          className='rounded-t-lg'
          placeholderSrc='/images/course-placeholder-cover.jpg'
        />
      </div>
      <div className='p-4'>
        <div className='flex items-center'>
          <div className='text-yellow-500'>
            <StarsRating rating={4.2} size={15} readOnly />
          </div>
          <span className='text-gray-600 text-xs ml-2'>{course.reviewsNumber}</span>
        </div>
        <h2 className='text-xl font-bold mt-2'>{course.title}</h2>
        <div className='flex items-center mt-2 text-gray-600'>
          <div className='flex items-center mr-4'>
            <MdOutlinePlayLesson />
            {course.lessonsNumber}
          </div>
          <div className='flex items-center'>
            <PiStudentBold />
            {course.studentsNumber}
          </div>
        </div>
        <p className='text-gray-600 mt-2'>It is a long established fact that a reader will be distracted.</p>
        <div className='flex items-center mt-4'>
          <Image
            className='w-10 h-10 rounded-full'
            src='https://rainbowit.net/html/histudy/assets/images/client/avatar-03.png'
            alt='Author'
            width={40}
            height={40}
          />
          <div className='ml-3'>
            <p className='text-gray-900 leading-none'>{course.instructorName} In Development</p>
          </div>
        </div>
        <div className='flex items-center mt-4'>
          <span className='text-2xl font-bold text-gray-900'>${course.price}</span>
          <span className='text-gray-500 line-through ml-2'>$120</span> {/* Replace this with your original price */}
        </div>
        <Link href='#' className='text-blue-500 hover:underline mt-4 inline-block'>
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default NarrowCard
