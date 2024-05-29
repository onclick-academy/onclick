'use client'

import { useState } from 'react'
import CourseInfo from '../UploadCourse/courseInfo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CourseIntro from '../UploadCourse/CourseIntro'
import { IoMdCheckmark } from 'react-icons/io'
import { useCourse } from '../UploadCourse/courseProvider'
import { Button } from '@/components/ui/button'
import { FaEye } from 'react-icons/fa'
import { MdOutlineLock } from 'react-icons/md'

export default function AccordionDemo() {
  const [isFirstFormVerified, setIsFirstFormVerified] = useState(false)
  const [isOpen, setIsOpen] = useState('')
  const { courseInfo, setCourseInfo } = useCourse()

  const handleFirstFormSubmit = () => {
    
    setIsFirstFormVerified(true)
  }

  const handleAccordionChange = (value: string) => {
    setIsOpen(value)
  }

  return (
    <div className='flex flex-col lg:flex-row p-8 lg:items-start items-center justify-center xl:gap-16 lg:gap-8 gap-4 mt-40 w-full min-h-screen bg-textgray bg-opacity-10 bg-gradient-to-br'>
      <Accordion
        type='single'
        collapsible
        className='w-full md:w-[700px] xl:w-[860px] flex flex-col gap-4 mt-10'
        onValueChange={handleAccordionChange}
      >
        <AccordionItem value='item-1' className={`border-b-0 rounded-sm p-1 bg-white h-76`}>
          <AccordionTrigger
            className={`p-4 hover:no-underline text-base font-bold ${
              isOpen === 'item-1' ? 'text-primary text-opacity-80' : 'text-black'
            }`}
          >
            Course Info
          </AccordionTrigger>
          <AccordionContent className='border-t border-lightborder'>
            <CourseInfo />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' className='border-b-0 rounded-sm p-1 bg-white h-76'>
          <AccordionTrigger
            className={`p-4 hover:no-underline text-base font-bold ${
              isOpen === 'item-2' ? 'text-primary text-opacity-80' : 'text-black'
            }`}
          >
            Course Intro Video
          </AccordionTrigger>
          <AccordionContent className='border-t border-lightborder '>
            <CourseIntro />
            <div className='flex flex-row justify-center mt-8' onClick={()=>{
              console.log(courseInfo)
            }}>
              <Button
                className='flex flex-row items-center gap-1 text-black text-lg hover:translate-y-1 shadow-spread-sm hover:shadow-none  bg-white hover:bg-quinary transition-all duration-500 h-[50px]'
                variant='outline'
                onClick={handleFirstFormSubmit}
              >
                <FaEye />
                <p>Send To Review </p>
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3' className='border-b-0 rounded-sm p-1 bg-white h-76'>
          {!isFirstFormVerified ? (
            <div
              className='p-4 text-base font-bold text-black flex items-center gap-2'
            >
              <MdOutlineLock className='text-2xl text-red text-opacity-60' />
              <p>Course Builder</p>
            </div>
          ) : (
            <AccordionTrigger
              className={`p-4 hover:no-underline text-base font-bold ${
                isOpen === 'item-3' ? 'text-primary text-opacity-80' : 'text-black'
              }`}
            >
              <p>Course Builder</p>
            </AccordionTrigger>
          )}
          {isFirstFormVerified && (
            <AccordionContent className='border-t border-lightborder'>
              Yes. animated by default, but you can disable it if you prefer.
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>

      <div className='w-full md:w-[699px] xl:w-[409px] lg:w-[380px] lg:mt-10 mt-6 border-primary rounded-md border-4 p-5 md:p-8 bg-white sticky top-4 '>
        <div className='w-full text-start'>
          <h1 className='md:text-3xl text-xl font-bold md:whitespace-nowrap'>Course Upload Tips</h1>
        </div>
        <div className='mt-6'>
          <ul className='flex flex-col gap-4 mt-4'>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Set the Course Price option or make it free.
              </p>
            </li>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Standard size for the course thumbnail is 700x430.
              </p>
            </li>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Video section controls the course overview video.
              </p>
            </li>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Course Builder is where you create & organize a course.
              </p>
            </li>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
              </p>
            </li>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Prerequisites refers to the fundamental courses to complete before taking this particular course.
              </p>
            </li>
            <li className='flex items-start gap-2'>
              <IoMdCheckmark className='w-[20px] text-lg mt-1 text-sucsessGreen' />
              <p className='w-11/12 text-darkGray font-medium text-sm md:text-base'>
                Information from the Additional Data section shows up on the course single page.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
