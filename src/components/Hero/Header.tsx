'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { NavMenu } from '@/components/Hero/NavMenu'
import { Button } from '@/components/ui/button'
import getData from '@/utilities/getUserData'

export default function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetching = async () => {
      const data = await getData()
      setUserData(data)
    }
    fetching()
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
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
      <header className="container py-6 flex justify-between items-center z-10 relative">
        <Link href="#">OnClick</Link>

        <div className="hidden md:block">
          <NavMenu />
        </div>

        <div className="flex items-center gap-5">
          <button onClick={togleOpen}>
            <Search width={30} />
          </button>

          {userData ? (
            <div className="flex gap-2">
              <Button><Link href="#">Login</Link></Button>
              <Button><Link href="#">Signup</Link></Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png"
                               className="z-10" />
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
        </div>
      </header>

      <div className="max-w-xl h-fit absolute left-1/2 transform -translate-x-1/2 z-10">
        <CommandDialog open={open}
                       onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
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
