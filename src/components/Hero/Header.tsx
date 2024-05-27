'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { IoIosMenu } from 'react-icons/io'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NavMenu } from '@/components/Hero/NavMenu'
import getData from '@/utilities/getUserData'
import Btn from '@/constants/Btn'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import * as React from 'react'

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const [userData, setUserData] = useState({})

  const links = [
    {
      title: 'Home',
      href: '#'
    },
    {
      title: 'Courses',
      href: '#courses'
    },
    {
      title: 'News',
      href: '#news'
    },
    {
      title: 'Events',
      href: '#events'
    }
  ]

  useEffect(() => {
    const fetching = async () => {
      // const data = await getData()
      const data = 'user'
      setUserData(data)
    }
    fetching()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  function togleOpen() {
    setOpen(!open)
  }

  return (
    <>
      <header className='container bg-transparent py-6 flex justify-between items-center z-10 relative'>
        <div className='flex items-center gap-4'>
          <Link href='#'>OnClick</Link>
          <div className='hidden md:block'>
            <NavMenu />
          </div>
        </div>

        <div className='hidden md:block'>
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link href={link.href} passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{link.title}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='flex items-center gap-5'>
          <button onClick={togleOpen}>
            <Search width={30} />
          </button>

          {userData ? (
            <div className='gap-2 hidden md:flex'>
              <Btn className='px-5 py-3'>
                <Link href='#'>Login</Link>
              </Btn>
              <Btn className='px-5 py-3'>
                <Link href='#'>Signup</Link>
              </Btn>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' className='z-10' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Cart</DropdownMenuItem>
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/** Navmenu in small screens */}
          <div className='flex md:hidden'>
            <Sheet>
              <SheetTrigger>
                <IoIosMenu size={30} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <Link href='#'>My Account</Link>
                  </SheetTitle>
                  <SheetTitle>
                    <Link href='#'>Cart</Link>
                  </SheetTitle>
                  <SheetTitle>
                    <Link href='#'>Wishlist</Link>
                  </SheetTitle>
                  <SheetTitle>
                    <Link href='#'>Logout</Link>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className='max-w-xl h-fit absolute left-1/2 transform -translate-x-1/2 z-10'>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder='Type a command or search...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </>
  )
}
