'use client'

import * as React from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { HiOutlineUpload } from 'react-icons/hi'
import Image from 'next/image'
import thumb from '../../Img/thumbnail-placeholder.svg'
import { useState } from 'react'
import { useCourse } from '../UploadCourse/courseProvider'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function SelectDemo() {
  const [showField, setShowField] = useState('')
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const { courseInfo, setCourseInfo } = useCourse()

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCourseInfo(prevInfo => ({
        ...prevInfo,
        introVideo: {
          local: URL.createObjectURL(file),
          Youtube: "",
        }
      }))
    }
  }
  const handleChange = (name:string, value:any) => {
      setCourseInfo(prevInfo => ({
        ...prevInfo,
        introVideo: {
          ...prevInfo.introVideo,
          [name]: value,
          local: ""
        },
      }))
    
  }
  
  return (
    <div className='w-full'>
      <Select onValueChange={value => setShowField(value)}>
        <SelectTrigger className='w-11/12 p-5 focus:ring-0'>
          <SelectValue placeholder='Select Video Source' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='Youtube'>Youtube</SelectItem>
            <SelectItem value='Local'>Local</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        {showField === 'Youtube' && (
          <div className='flex flex-col space-y-1.5 mt-4 w-11/12'>
            <Label htmlFor='name' className='text-sm font-semibold'>
              Add Your Video URL
            </Label>
            <Input
              id='Slug'
              placeholder='Add Your Video URL'
              className='p-5 bg-transparent ring-1 ring-textgray ring-opacity-20 focus-visible:ring-primary focus:ring-primary focus:outline-none focus:ring-2 focus:border-0 transition-all duration-200'
              onChange={e => handleChange('Youtube', e.target.value)}
            />
            <p className='flex flex-row items-center text-textgray gap-1 text-sm'>
              <RiErrorWarningLine className='text-lg' />
              Example: <p className='text-black'>https://www.youtube.com/watch?v=yourvideoid</p>
            </p>
          </div>
        )}
        {showField === 'Local' && (
          <div className='flex flex-col w-11/12 space-y-1.5 mt-4'>
            <Label htmlFor='thumbnail' className='text-sm font-semibold'>
              Upload Your Video
            </Label>
            <input type='file' id='thumbnail' accept='video/*' onChange={handleThumbnailChange} className='hidden' />
            <div className='w-full  h-40 relative'>
              <Image
                src={thumb}
                alt='thumb'
                className='w-full h-full object-cover cursor-pointer rounded-md outline-dashed outline-2 outline-primary'
                onClick={() => document.getElementById('thumbnail')?.click()}
              />
              <div
                className='absolute top-1/3  flex flex-col justify-center items-center cursor-pointer hover:scale-75 transition-transform duration-200'
                onClick={() => document.getElementById('thumbnail')?.click()}
                style={{ left: '40%' }}
              >
                <HiOutlineUpload className='text-primary text-5xl  w-full' />
                <p className='text-white text-xl font-bold'>Choose A File</p>
              </div>
            </div>
            {thumbnail && (
              <div className='mt-2'>
                <p className='text-textgray font-semibold'>Selected File: {thumbnail.name}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
