import { Badge } from 'lucide-react'
import Image from 'next/image'

import Stars from '@/constants/Stars'
import HeroBanner from './hero-img.png'
import Shape1 from './shape-1.png'
import Shape2 from './shape-2.png'
import Shape3 from './shape-3.png'

export default function Landing() {
  /* TODO: Add floating elements*/

  return (
    <div className="w-screen">
      <div className="absolute left-1/2 transform z-0 -translate-x-1/2 top-0">
        <Image src={Shape3} width={500} height={500} alt="shape1" />
      </div>
      <div className="absolute top-[40%] z-0">
        <Image src={Shape1}
               alt="shape1"
               width={600}
               height={600}
               className="z-0" />
      </div>
      <div className="hidden lg:block absolute right-0 z-0">
        <Image src={Shape2}
               alt="shape2"
               className="z-0" />
      </div>
      <div className="mx-auto container flex flex-col lg:flex-row gap-8 lg:gap-0 items-center py-20">
        <div className="flex-1 order-2 lg:order-1">
          <div className="flex gap-4 lg:gap-16 flex-col lg:flex-row pb-12">
            <div className="flex flex-col items-center gap-3">
              <Stars fill={4} half={1} size={24} color="#FF8F3C" />
              <p className="font-semibold ">12500+ TRUST CUSTOMER</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Badge fill="#FF8F3C"
                     stroke="#FF8F3C"
                     className="mx-auto lg:mr-0 lg:ml-0" />
              <p className="font-semibold">OnClick ELITE AUTHOR</p>
            </div>
          </div>

          <h1 className="mb-12 text-center lg:text-left text-3xl lg:text-7xl font-semibold">
            Have your dream site in minutes for <SlidingText />
          </h1>
        </div>

        <div className="flex-1 flex justify-center lg:order-1 z-0">
          <Image src={HeroBanner}
                 alt="Hero banner section" />
        </div>
      </div>
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
