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
  console.log('🚀 ~ NarrowCard ~ course:', course)

  return (
    <div className='card'>
      <div className='image-container relative w-full'>
        <CustomImage
          src={course.photo} // Replace this with your dynamic photo source from database
          alt='Course cover'
          layout='fill'
          objectFit='cover'
          className='rounded-t-lg'
          placeholderSrc='/images/course-placeholder-cover.jpg'
          style={{}}
        />
      </div>
      <div className='course-info p-4'>
        <div className='flex items-center'>
          <div className='text-yellow-500'>
            <StarsRating rating={4.2} size={15} readOnly />
          </div>
          <span className='text-gray-600 text-xs ml-2'>{course.reviewsNumber}</span>
        </div>
        <h2 className='course-title text-xl font-bold mt-2'>
          {course.title.length > 50 ? course.title.slice(0, 50) + '...' : course.title}
        </h2>
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
        {course.description.length > 150 ? (
          <div
            className='flex'
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <p className='course-description text-gray-600 mt-4'>{course.description.slice(0, 150)}...</p>
          </div>
        ) : (
          <p className='text-gray-600 mt-4'>{course.description}</p>
        )}
        <div className='flex items-center mt-6'>
          <Image
            className='w-10 h-10 rounded-full'
            src='https://rainbowit.net/html/histudy/assets/images/client/avatar-03.png'
            alt='Author'
            width={40}
            height={40}
          />
          <div className='ml-3'>
            <p className='text-gray-900 leading-none'>
              {course.instructorName} <span className='text-gray-600'>In</span>{' '}
              <Link href={`/courses?search=${course.category}`} className='text-blue-500'>
                {course.category}
              </Link>
            </p>
          </div>
        </div>
        <div className='flex mt-6' style={{ justifyContent: 'space-between' }}>
          <span className='text-2xl font-bold text-gray-900'>${course.price}</span>
          <Link href={`/courses?search=${course.category}`} className='text-blue-500 hover:underline mt-4 inline-block'>
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NarrowCard
