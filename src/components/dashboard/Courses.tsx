import * as React from 'react'
import { CardHeader, Typography, Button, Chip, CardFooter, Tabs, TabsHeader, Tab } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Image from 'next/image'
import im from '../../Img/training-course.png'
import { Badge } from '@/components/ui/badge'
import Actionlist from './Actionlist'
import CourseDrawer from './Drawer'

interface Course {
  id: string
  title: string
  description: string
  photo: string
  price: number
  CourseOwners: [string] | any
  certificate: boolean
  isApproved: boolean
  createdAt: string
}

const TABLE_HEAD = ['Course', 'Status', 'Date', 'Action']

export default function MembersTable() {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedTab, setSelectedTab] = useState<string>('All')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch courses')
      }

      const responseData = await res.json()
      const courseData = responseData.data
      setCourses(courseData)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }
  console.log(courses)
  const filteredItems = courses?.filter(course => {
    if (selectedTab === 'All') return true
    if (selectedTab === 'Approved') return course.isApproved
    if (selectedTab === 'Pending') return !course.isApproved
    return false
  })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem)

  const TABS = [
    {
      label: 'All',
      value: `All`
    },
    {
      label: 'Approved',
      value: `Approved`
    },
    {
      label: 'Pending',
      value: 'Pending'
    }
  ]
  console.log(currentItems)
  return (
    <div className='h-full w-full mt-4'>
      <div className='rounded-none  '>
        <div className='mb-4 flex items-center justify-between gap-8'>
          <div>
            <h3 className='ml-4 text-xl font-thin font-mono'>Courses</h3>
          </div>
        </div>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row border-none shadow-none'>
          <Tabs value='All' className='md:w-max rounded-lg border shadow-sm w-1/5 mb-2 bg-gray border-gray'>
            <TabsHeader
              placeholder=''
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              indicatorProps={{
                className: 'bg-white shadow-none border  text-red z-0'
              }}
              className='bg-gray'
            >
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className='text-redc z-20 '
                  placeholder=''
                  onPointerEnterCapture={() => {}}
                  onPointerLeaveCapture={() => {}}
                  onClick={() => {
                    setSelectedTab(value)
                    setCurrentPage(1)
                  }}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className='w-full md:w-72 mr-2 rounded-lg shadow-sm mb-2'>
            <input
              type='text'
              placeholder='Search'
              className='w-full px-4 py-2 border border-blue-gray-200 rounded-lg focus:outline-none '
            />
          </div>
        </div>
      </div>
      <div className='px-0  shadow-md mt-2'>
        <table className='mt-1 w-full min-w-max table-auto text-left shadow-md'>
          <thead className=''>
            <tr>
              {TABLE_HEAD.map(head => (
                <th key={head} className='border-y border-gray bg-gray   p-4'>
                  <h2 className='font-normal leading-none opacity-70 text-sm'>{head}</h2>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((course: Course, index: number) => {
              const isLast = index === courses.length - 1
              const classes = isLast ? 'p-4 ' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={course.id} className='hover:bg-gray transition-all duration-75'>
                  <td className={`${classes} `}>
                    <div className='flex items-center gap-3 '>
                      <Image src={im} alt={course.title} width={40} height={40} />
                      <div className='flex flex-col'>
                        {
                          <CourseDrawer
                            title={course.title}
                            description={course.description}
                            photo={course.photo}
                            price={course.price}
                            CourseOwners={course.CourseOwners}
                            certificate={course.certificate}
                            component={'course'}
                          />
                        }

                        <h2 className='font-normal opacity-70 text-sm text-textgray'>{course.id}</h2>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className='flex flex-col w-1/2 '>
                      <Badge
                        variant='destructive'
                        className={`pr-5 text-black ${
                          course.isApproved ? `bg-quaternary` : `bg-septenary`
                        }  border-none`}
                      >
                        {course.isApproved ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  </td>
                  <td className={classes}>
                    <p color='blue-gray' className='font-normal text-sm'>
                      {course.createdAt.split('T')[0]}
                    </p>
                  </td>

                  <td className={`${classes}`}>
                    <Actionlist
                      id={course.id}
                      fetchCourses={fetchCourses}
                      param='courses'
                      method='PUT'
                      component='course'
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <h5 className=' text-sm  '>{`Page ${currentPage} of ${Math.ceil(filteredItems?.length / itemsPerPage)}`}</h5>
        <div className='flex gap-2'>
          <Button
            variant='outlined'
            size='sm'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage))}
            placeholder=''
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Previous
          </Button>
          <Button
            variant='outlined'
            size='sm'
            disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
            onClick={() =>
              setCurrentPage(prevPage =>
                prevPage < Math.ceil(filteredItems.length / itemsPerPage) ? prevPage + 1 : prevPage
              )
            }
            placeholder=''
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Next
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  )
}
