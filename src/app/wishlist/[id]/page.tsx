'use client'

import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import Header from '@/components/Hero/Header'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Btn from '@/constants/Btn'
import { useSearchParams } from 'next/navigation'

const courses = [
  {
    id: '1',
    name: 'Introduction to Programming',
    description: 'Learn the basics of programming with this beginner-friendly course.',
    duration: '4 weeks',
    price: 99.99,
  },
  {
    id: '2',
    name: 'Advanced JavaScript',
    description: 'Dive deeper into JavaScript with advanced concepts and frameworks.',
    duration: '8 weeks',
    price: 149.99,
  },
]

export default function Wishlist() {
  const [userCourses, setUserCourses] = useState(courses)

  const removeCourse = (courseId: string) => {
    setUserCourses(userCourses.filter(course => course.id !== courseId))
  }

  const params = useSearchParams()
  const id = params.get('id')

  return (
    <>
      <Header />

      <div className="container w-full pt-8 pb-24 flex gap-4 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">
          Wishlist for {id}
        </h1>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Wishlist</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="sm:container flex max-sm:px-1 flex-col items-center justify-center">
        <Table>
          <TableHeader className="rounded-lg overflow-hidden">
            <TableRow className="bg-gradient-to-r background-size[300x100] text-white">
              <TableHead className="text-white">Course</TableHead>
              <TableHead className="text-white text-center hidden sm:table-cell">Price</TableHead>
              <TableHead className="text-white text-center hidden md:table-cell">Duration</TableHead>
              <TableHead className="text-white text-center">Action</TableHead>
              <TableHead className="text-white text-center">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-semibold max-sm:px-0 max-sm:text-xs text-wrap">{course.name}</TableCell>
                <TableCell className="text-center text-nowrap hidden sm:table-cell">{course.price} $</TableCell>
                <TableCell className="text-center hidden md:table-cell">{course.duration}</TableCell>
                <TableCell className="max-sm:px-0 max-sm:text-xs">
                  <Btn className="text-sm mx-auto px-3 py-6">Add to card</Btn>
                </TableCell>
                <TableCell className="text-center max-sm:px-0">
                  <button className="max-sm:text-xs"
                          onClick={() => removeCourse(course.id)}>
                    <IoClose size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
