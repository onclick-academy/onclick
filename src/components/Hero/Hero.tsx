import Header from '@/components/Hero/Header'
import Landing from '@/components/Hero/Landing'
import './Hero.css'

export default function Hero() {
  return (
    <div className="min-h-screen px-14 bg-hero">
      <Header />
      <Landing />
    </div>
  )
}

// import './Hero.css'
// import BannerImg from '../../../public/hero-img.png'
// import Badge from '@/constants/Badge'
// import Star from '@/constants/Star'
// import { Button } from '../ui/button'
//
// export default function Hero() {
//   const stars = [...Array(5)].map((_, index) => <Star key={`star-${index}`} />)
//
// export default function x() {
//   return (
//     <div className="hero-bg px-[150px] py-[100px]">
//       <div className="flex items-center">
//         <div className="flex-1">
//           <div className="mb-6">
//             <div className="flex gap-16">
//               <div className="flex flex-col">
//                 <div className="flex mb-2">{stars}</div>
//                 <p className="font-semibold">12500+ TRUST CUSTOMER</p>
//               </div>
//
//               <div className="flex flex-col">
//                 <div className="flex mb-2">
//                   <Badge />
//                 </div>
//                 <p className="font-semibold">ENVATO ELITE AUTHOR</p>
//               </div>
//             </div>
//           </div>
//
//           <div className="mb-6">
//             <h1 className="text-7xl max-lg:text-6xl max-md:text-5xl font-bold text-ocblack pr-[20%]">
//               Have your dream site in minutes for <SlidingText />
//             </h1>
//           </div>
//
//           <p className="text-senary text-2xl">
//             The
//             most <strong className="underline underline-offset-2">powerful</strong> yet
//             the{' '}
//             <strong className="underline underline-offset-2">easiest</strong> template
//             ever.
//           </p>
//         </div>
//         <Button className="bg-septenary w-48 h-14">Get Started</Button>
//
//         <div className="flex-1">
//           <div>
//             <img src={'hero-img.png'} className="w-full" alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

//
// function SlidingText() {
//   return (
//     <ul className='text-sliding-animation h-24 overflow-hidden'>
//       <li>
//         <span>Online Course.</span>
//       </li>
//       <li>
//         <span>Like Udemy.</span>
//       </li>
//       <li>
//         <span>School.</span>
//       </li>
//       <li>
//         <span>University.</span>
//       </li>
//       <li>
//         <span>High School.</span>
//       </li>
//       <li>
//         <span>Kindergarden.</span>
//       </li>
//     </ul>
//   )
// }
