'use client'

import * as React from 'react'
import { Calendar, MoreHorizontal, Tags, Trash, User } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ActionlistProps {
  id: string
  method: string
  param: string
  key?: any
  value?: any
  component: string
  extention?: string
  fetchCourses: () => Promise<void>
}

export default function ComboboxDropdownMenu({ id, fetchCourses, param, method, component }: ActionlistProps) {
  const [open, setOpen] = React.useState(false)
  const handleApprove = async (id: string, method: string, param: string, extention: string, key: any, value: any) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/${param}/${component === 'course' ? id : extention}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(key ? { [key]: value } : {})
      })
      console.log(key, value, res)
      if (!res.ok) {
        throw new Error('Failed to fetch')
      }
      fetchCourses()
    } catch (error) {
      console.error('Error approving course:', error)
    }
  }

  const renderCourseProps = () => {
    if (component === 'course') {
      return (
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleApprove(id, method, param, '', 'isApproved', true)}>
              <User className='mr-2 h-4 w-4' />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleApprove(id, method, param, '', 'isApproved', false)}>
              <User className='mr-2 h-4 w-4' />
              Pend
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-red-600'
              onClick={() => handleApprove(id, method, '', param, 'DELETE', false)}
            >
              <Trash className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )
    }
    return null
  }

  const renderInstructorProps = () => {
    if (component === 'instructor') {
      return (
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleApprove(id, method, param, 'approve', 'instructorId', id)}>
              <User className='mr-2 h-4 w-4' />
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleApprove(id, method, param, 'decline', 'instructorId', id)}>
              <User className='mr-2 h-4 w-4' />
             Decline
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )
    }
    return null
  }

  return (
    <div className='flex w-1/2 flex-col items-start justify-between rounded-md border-none  py-3 sm:flex-row sm:items-center  rotate-90'>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='border-none '>
            <MoreHorizontal className='border-none' />
          </Button>
        </DropdownMenuTrigger>
        {component === 'course' ? renderCourseProps() : component === 'instructor' ? renderInstructorProps() : null}
      </DropdownMenu>
    </div>
  )
}
