import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { NavMenu } from '@/components/Hero/NavMenu'
import { Button } from '@/components/ui/button'

export default function Header() {
  const isAuth = false

  return (
    <header className='py-6 flex justify-between items-center z-20'>
      <Link href='/'>Logo</Link>

      <NavMenu />

      <div className='flex items-center gap-3'>
        {/* TODO: onsearch dispaly a modal for search & results, reference: frontendMasters */}
        <button>
          <Search width={25} />
        </button>

        <Link href='/'>
          <ShoppingCart width={25} />
        </Link>

        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      {isAuth && (
        <div className='flex gap-2'>
          <Button>Signin</Button>
          <Button>Signup</Button>
        </div>
      )}
    </header>
  )
}
