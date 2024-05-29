import * as React from 'react'
import { useState, ChangeEvent } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import ComboboxDemo from '@/components/categories/Categories'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Image from 'next/image'
import thumb from '../../Img/thumbnail-placeholder.svg'
import { HiOutlineUpload } from 'react-icons/hi'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCourse } from './courseProvider'
import styles from './upload.module.css'

export default function CourseInfoComponent() {
  const [selectedButton, setSelectedButton] = useState('general')
  const [selectedPrice, setSelectedPrice] = useState('Paid')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const { courseInfo, setCourseInfo } = useCourse()

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      setCourseInfo(prevInfo => ({
        ...prevInfo,
        thumbnail: files[0]
      }))
    }
  }

  const handleChange = (name: string, value: any) => {
    if (name === 'public' || name === 'qa' || name === 'drip') {
      setCourseInfo(prevInfo => ({
        ...prevInfo,
        settings: {
          ...prevInfo.settings,
          [name]: value
        }
      }))
    } else {
      setCourseInfo(prevInfo => ({
        ...prevInfo,
        [name]: value
      }))
    }
  }

  return (
    <div className='w-full flex justify-start'>
      <Card className='w-full border-0 '>
        <CardContent className='p-5'>
          <form className=''>
            <div className='grid w-full grid-cols-1 items-center gap-8'>
              <div className='flex flex-col space-y-1.5 '>
                <Label htmlFor='title' className='text-sm font-semibold'>
                  Course Title
                </Label>
                <Input
                  id='title'
                  name='title'
                  placeholder='New Course'
                  className='p-6 bg-transparent ring-1 ring-textgray ring-opacity-20 focus-visible:ring-primary focus:ring-primary focus:outline-none focus:ring-2 focus:border-0 transition-all duration-200'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
                <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                  <RiErrorWarningLine className='text-lg' />
                  Title should be 30 characters
                </p>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='slug' className='text-sm font-semibold'>
                  Course Slug
                </Label>
                <Input
                  id='slug'
                  name='slug'
                  placeholder='new-course'
                  className='p-6 bg-transparent ring-1 ring-textgray ring-opacity-20 focus-visible:ring-primary focus:ring-primary focus:outline-none focus:ring-2 focus:border-0 transition-all duration-200'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                />
                <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                  <RiErrorWarningLine className='text-lg' />
                  Permalink: <span className='text-black'>https://yourdomain.com/new-course</span>
                </p>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='description' className='text-sm font-semibold'>
                  About Course
                </Label>
                <textarea
                  name='description'
                  id='description'
                  rows={10}
                  className=' rounded-md bg-transparent ring-1 ring-textgray ring-opacity-20 focus-visible:ring-primary focus:ring-primary focus:outline-none focus:ring-2 focus:border-0 transition-all duration-200'
                  onChange={e => handleChange(e.target.name, e.target.value)}
                ></textarea>
                <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                  <RiErrorWarningLine className='text-lg' />
                  HTML or plain text allowed, no emoji. This field is used for search, so please be descriptive!
                </p>
              </div>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col space-y-1.5 bg-textgray bg-opacity-15 p-5 rounded-md w-full'>
                  <Label htmlFor='name' className='text-base font-normal'>
                    Course Settings
                  </Label>
                  <div className='flex flex-row justify-start gap-12'>
                    <div className='flex flex-col w-4/12 gap-2'>
                      <Button
                        variant='outline'
                        className={`rounded-3xl h-12 border-0 hover:bg-primary hover:text-white transition-all duration-200 ${
                          selectedButton === 'general' && 'bg-primary text-white'
                        }`}
                        type='button'
                        onClick={() => setSelectedButton('general')}
                      >
                        General
                      </Button>
                      <Button
                        variant='outline'
                        type='button'
                        className={`rounded-3xl h-12 border-0 hover:bg-primary hover:text-white transition-all duration-200 ${
                          selectedButton !== 'general' && 'bg-primary text-white'
                        }`}
                        onClick={() => setSelectedButton('Content Drip')}
                      >
                        Content Drip
                      </Button>
                    </div>
                    {selectedButton === 'general' && (
                      <div className='flex flex-col gap-4 w-8/12'>
                        <div className='flex flex-col space-y-1.5'>
                          <Label htmlFor='difficulty' className='mb-2'>
                            Difficulty Level
                          </Label>
                          <Select onValueChange={value => handleChange('difficulty', value)}>
                            <SelectTrigger
                              id='difficulty'
                              name='difficulty'
                              className='bg-transparent border-1 border-textgray border-opacity-20 text-textgray text-sm font-normal focus:ring-muted'
                            >
                              <SelectValue placeholder='All Levels' />
                            </SelectTrigger>
                            <SelectContent position='popper'>
                              <SelectItem value='All Levels'>All Levels</SelectItem>
                              <SelectItem value='Intermediate'>Intermediate</SelectItem>
                              <SelectItem value='Beginner'>Beginner</SelectItem>
                              <SelectItem value='Advance'>Advance</SelectItem>
                              <SelectItem value='Expert'>Expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                            <RiErrorWarningLine className='text-lg' />
                            Course Difficulty Level
                          </p>
                        </div>
                        <div className='mt-4 flex flex-col items-start gap-4'>
                          <Label htmlFor='public-course'>Public Course</Label>
                          <Switch
                            id='public-course'
                            className='outline-2 outline-quinary focus:outline'
                            name='public'
                            checked={courseInfo.settings.public}
                            onCheckedChange={e => handleChange('public', e)}
                          />
                          <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                            <RiErrorWarningLine className='text-lg' />
                            Make This Course Public. No enrollment required.
                          </p>
                        </div>
                        <div className='mt-4 flex flex-col items-start gap-4'>
                          <Label htmlFor='qa'>Q&A</Label>
                          <Switch
                            id='qa'
                            name='qa'
                            className='outline-2 outline-quinary focus:outline'
                            checked={courseInfo.settings.qa}
                            onCheckedChange={e => handleChange('qa', e)}
                          />
                        </div>
                      </div>
                    )}
                    {selectedButton === 'Content Drip' && (
                      <div className='w-8/12 flex flex-col gap-4 '>
                        <div className='border-b-2 border-textgray border-opacity-20 pb-5'>
                          <div className='flex flex-row items-center text-textgray font-medium text-sm gap-1'>
                            <input
                              type='checkbox'
                              name='drip'
                              id='drip1'
                              checked={courseInfo.settings.drip === true}
                              onChange={e => handleChange('drip', e.target.checked? true: false)}
                            />
                            <label htmlFor='drip1'>Enable</label>
                          </div>
                          <p className='flex flex-row items-center text-textgray gap-1 text-sm mt-2'>
                            <RiErrorWarningLine className='text-sm' />
                            Enable / Disable content drip
                          </p>
                        </div>
                        <div className='border-textgray pb-5'>
                          <div className='flex flex-row items-center text-black font-medium text-base gap-1'>
                            <label htmlFor='Radio'>Content Drip Type</label>
                          </div>
                          <p className='flex flex-row items-center text-textgray gap-1 text-sm mt-2'>
                            You can schedule your course content using the above content drip options.
                          </p>
                          <RadioGroup
                            defaultValue='comfortable'
                            className='mt-4'
                            name='dripContent'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleChange(e.target.name, e.target.value)
                            }
                          >
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='Schedule Course Contents By Date' id='r1' className='' />
                              <Label htmlFor='r1' className='text-textgray '>
                                Schedule Course Contents By Date
                              </Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='Content Available After X Days From Enrollment' id='r2' />
                              <Label htmlFor='r2' className='text-textgray '>
                                Content Available After X Days From Enrollment
                              </Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='Course Content Available Sequentially' id='r3' />
                              <Label htmlFor='r3' className='text-textgray '>
                                Course Content Available Sequentially
                              </Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <RadioGroupItem value='Course Content Unlocked After Finishing Prerequisites' id='r4' />
                              <Label htmlFor='r4' className='text-textgray '>
                                Course Content Unlocked After Finishing Prerequisites
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col space-y-1.5 bg-textgray bg-opacity-15 p-5 rounded-md w-full'>
                  <Label htmlFor='price' className='text-base font-normal'>
                    Course Price
                  </Label>
                  <div className='flex flex-row justify-start gap-12'>
                    <div className='flex flex-col w-4/12 gap-2'>
                      <Button
                        variant='outline'
                        className={`rounded-3xl h-12 border-0 hover:bg-primary hover:text-white transition-all duration-200 ${
                          selectedPrice === 'Paid' && 'bg-primary text-white'
                        }`}
                        type='button'
                        onClick={() => setSelectedPrice('Paid')}
                      >
                        Paid
                      </Button>
                      <Button
                        variant='outline'
                        type='button'
                        className={`rounded-3xl h-12 border-0 hover:bg-primary hover:text-white transition-all duration-200 ${
                          selectedPrice === 'Free' && 'bg-primary text-white'
                        }`}
                        onClick={() => setSelectedPrice('Free')}
                      >
                        Free
                      </Button>
                    </div>
                    <div className='w-8/12 flex flex-col gap-4 '>
                      {selectedPrice === 'Paid' && (
                        <div className='flex flex-col gap-6'>
                          <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='price' className='mb-2'>
                              Price
                            </Label>
                            <Input
                              id='price'
                              placeholder='100'
                              type='number'
                              name='price'
                              className='p-6 bg-transparent ring-1 ring-textgray ring-opacity-20 focus-visible:ring-primary focus:ring-primary focus:outline-none focus:ring-2 focus:border-0 transition-all duration-200'
                              onChange={e => handleChange(e.target.name, e.target.value)}
                            />
                            <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                              <RiErrorWarningLine className='text-lg' />
                              The Course Price Includes Your Author Fee.
                            </p>
                          </div>
                          <div className='flex flex-col space-y-1.5'>
                            <Label htmlFor='discount' className='mb-2'>
                              Discounted Price ($)
                            </Label>
                            <Input
                              id='discount'
                              placeholder='100'
                              type='number'
                              name='discount'
                              className='p-6 bg-transparent ring-1 ring-textgray ring-opacity-20 focus-visible:ring-primary focus:ring-primary focus:outline-none focus:ring-2 focus:border-0 transition-all duration-200'
                              onChange={e => handleChange(e.target.name, e.target.value)}
                            />
                            <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
                              <RiErrorWarningLine className='text-lg' />
                              The Course Price Includes Your Author Fee.
                            </p>
                          </div>
                        </div>
                      )}
                      {selectedPrice === 'Free' && (
                        <div className='flex flex-col space-y-1.5 text-textgray '>
                          <Label htmlFor='framework' className='mb-2'>
                            This Course is free for everyone
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor='framework' className='mb-2 ml-1 font-semibold'>
                  Choose Categories
                </Label>
                <ComboboxDemo />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='thumbnail' className='text-sm font-semibold'>
                  Course Thumbnail
                </Label>
                <input
                  type='file'
                  id='thumbnail'
                  accept='image/*'
                  onChange={handleThumbnailChange}
                  className='hidden'
                />
                <div className='w-full h-60 relative'>
                  <Image
                    src={thumb}
                    alt='thumb'
                    className='w-full h-full object-cover cursor-pointer rounded-md outline-dashed outline-2 outline-primary'
                    onClick={() => document.getElementById('thumbnail')?.click()}
                  />
                  <div
                    className={`absolute top-1/3 flex flex-col justify-center items-center cursor-pointer hover:scale-75 transition-transform duration-200 thumb ${styles.thumb}`}
                    onClick={() => document.getElementById('thumbnail')?.click()}
                  >
                    <HiOutlineUpload className='text-primary text-5xl w-full' />
                    <p className='text-white text-xl font-bold'>Choose A File</p>
                  </div>
                </div>
                {thumbnail && (
                  <div className='mt-2'>
                    <p className='text-textgray font-semibold'>Selected File: {thumbnail.name}</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
