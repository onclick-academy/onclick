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
    <div className="flex items-center max-lg:flex-col max-lg:gap-8 py-20">
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0">
        <Image
          src={Shape3}
          width={500}
          height={500}
          alt="shape1"
        />
      </div>

      <div className="absolute top-[40%]">
        <Image
          src={Shape1}
          width={500}
          height={500}
          alt="shape1"
        />
      </div>

      <div className="absolute right-0 z-[1]">
        <Image
          src={Shape2}
          alt="shape2"
        />
      </div>

      <div className="flex-1 max-lg:order-2">
        <div className="flex gap-16 pb-12">
          <div className="flex flex-col gap-3">
            <Stars fill={4}
                   half={1}
                   size={24}
                   color="#FF8F3C" />

            <p className="font-semibold">
              12500+ TRUST CUSTOMER
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Badge fill="#FF8F3C"
                   stroke="#FF8F3C" />
            <p className="font-semibold">
              OnClick ELITE AUTHOR
            </p>
          </div>
        </div>

        <h1 className="mb-12 text-6xl font-semibold">
          Have your dream site in minutes
          for <SlidingText />
        </h1>

        <h6 className="font-light">
          The
          most <span className="font-semibold underline underline-offset-2">powerful</span> yet
          the <span
          className="font-semibold underline underline-offset-2">easiest</span> template
          ever.
        </h6>
      </div>

      <div className="flex-1 flex justify-center max-lg:order-1 z-[2]">
        <Image
          src={HeroBanner}
          width={500}
          height={500}
          alt="Hero banner section"
        />
      </div>
    </div>
  )
}

function SlidingText() {
  return (
    <ul className="text-sliding-animation h-20 overflow-hidden w-full">
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
