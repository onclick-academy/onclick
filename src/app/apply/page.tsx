'use client'
import React from 'react'
import AccordionDemo from '../../components/Accordion/Accordion'
import CourseProvider from '../../components/UploadCourse/courseProvider'

export default function page() {
  return (
    <CourseProvider>
    <div className='w-full'>
      <AccordionDemo />
    </div>
    </CourseProvider>
  )
}
