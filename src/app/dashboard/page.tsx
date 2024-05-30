'use client'
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'
import { useState } from 'react'
import Courses from '../../components/dashboard/Courses'
import Instructors from '../../components/dashboard/Instructors'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiStudentFill } from 'react-icons/pi'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

export default function CommandDemo() {
  const [activeItem, setActiveItem] = useState('Courses')

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
  }
  console.log(activeItem)

  return (
    <div className='flex flex-row justify-center gap-4 mt-8'>
      <Command className='rounded-lg border shadow-md w-1/5 h-96 mt-2'>
        <CommandList>
          <CommandGroup heading='Suggestions'>
            <div onClick={() => handleItemClick('Courses')}>
              <CommandItem>
                <PiStudentFill className='mr-2 h-4 w-4' />
                <span>Courses</span>
              </CommandItem>
            </div>
            <div onClick={() => handleItemClick('Search Emoji')}>
              <CommandItem>
                <FaChalkboardTeacher className='mr-2 h-4 w-4' />
                <span>Instructors</span>
              </CommandItem>
            </div>
            <div onClick={() => handleItemClick('Calculator')}>
              <CommandItem>
                <Calculator className='mr-2 h-4 w-4' />
                <span>Calculator</span>
              </CommandItem>
            </div>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem onClick={() => handleItemClick('Profile')}>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onClick={() => handleItemClick('Billing')}>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onClick={() => handleItemClick('Settings')}>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>

      <div className='bg-white w-2/3'>
        {activeItem === 'Courses' ? <Courses /> : <Instructors />}
        <div className='border-spacing-1'></div>
      </div>
    </div>
  )
}
