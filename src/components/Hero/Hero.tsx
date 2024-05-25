import { Badge } from 'lucide-react'
import Image from 'next/image'

import Stars from '@/constants/Stars'
import HeroBanner from './hero-img.png'
import Shape1 from './shape-1.png'
import Shape2 from './shape-2.png'
import Shape3 from './shape-3.png'
// import Header from '@/components/Hero/Header'
import Landing from '@/components/Hero/Landing'
// import './Hero.css'

export default function Hero() {
  /* TODO: Add floating elements*/

  return (
    <div className="min-h-screen px-14 bg-hero">
      {/*<Header />*/}
      <Landing />
    </div>
  )
}

function SlidingText() {
  return (
    <ul className="text-sliding-animation h-16 lg:h-24 overflow-hidden w-full">
      <li>
        <span>Online Course.</span>
      </li>
      <li>
        <span>Like Udemy.</span>
      </li>
      <li>
        <span>School.</span>
      </li>
      <li>
        <span>University.</span>
      </li>
      <li>
        <span>High School.</span>
      </li>
      <li>
        <span>Kindergarden.</span>
      </li>
    </ul>
  )
}
