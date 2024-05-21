import * as React from 'react'
import {  Button, Tabs, TabsHeader, Tab } from '@material-tailwind/react'
import { useState, useEffect } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Image from 'next/image'
import im from '../../Img/training-course.png'
import { Badge } from '@/components/ui/badge'
import Actionlist from './Actionlist'
import CourseDrawer from './Drawer'

interface Instructor {
  id: string
  firstName: string
  lastName: string
  username: string
  email: number
  phoneNum: string
  profilePic: string
  isApproved: boolean
  gender: string
  isApprovedAsInstructor: boolean
  length: number
  bio: string
}

const TABLE_HEAD = ['Instructor', 'Status', 'Gender', 'Action']

export default function MembersTable() {
  const [Instructors, setInstructor] = useState<Instructor[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedTab, setSelectedTab] = useState<string>('All')
  useEffect(() => {
    fetchInstructors()
  }, [])

  const fetchInstructors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/instructors', {
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
      const instructorData = responseData.data
      setInstructor(instructorData)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }
  console.log(Instructors)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = Instructors?.slice(indexOfFirstItem, indexOfLastItem)

  const filteredItems = currentItems?.filter(instructor => {
    if (selectedTab === 'All') return true
    if (selectedTab === 'Approved') return instructor.isApprovedAsInstructor
    if (selectedTab === 'Pending') return !instructor.isApprovedAsInstructor 
    return false
  })

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
            <h3 className='ml-4 text-xl font-thin font-mono'>Instructors</h3>
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
                  onClick={() => setSelectedTab(value)}
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
            {filteredItems?.map((Instructors: Instructor, index: number) => {
              const isLast = index === Instructors.length - 1
              const classes = isLast ? 'p-4 ' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={Instructors.id} className='hover:bg-gray transition-all duration-75'>
                  <td className={`${classes} `}>
                    <div className='flex items-center gap-3 '>
                      <Image src={im} alt={Instructors.username} width={40} height={40} />
                      <div className='flex flex-col'>
                        {
                          <CourseDrawer
                            username={Instructors.username}
                            bio={Instructors.bio}
                            firstName={Instructors.firstName}
                            lastName={Instructors.lastName}
                            photo={Instructors.profilePic}
                            InstructorId={Instructors.id}
                            phone={Instructors.phoneNum}
                            component={'instructor'}
                          />
                        }

                        <h2 className='font-normal opacity-70 text-sm text-textgray'>{Instructors.email}</h2>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className='flex flex-col w-1/3 '>
                      <Badge
                        variant='destructive'
                        className={`pr-8 text-black ${
                          Instructors.isApprovedAsInstructor ? `bg-quaternary` : `bg-septenary`
                        }  border-none`}
                      >
                        {Instructors.isApprovedAsInstructor ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  </td>
                  <td className={classes}>
                    <p color='blue-gray' className='font-normal text-sm'>
                      {Instructors.gender}
                    </p>
                  </td>

                  <td className={`${classes}`}>
                    <Actionlist
                      id={Instructors.id}
                      fetchCourses={fetchInstructors}
                      param='admin/instructor'
                      method='POST'
                      component='instructor'
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        <h5 className=' text-sm  '>{`Page ${currentPage} of ${Math.ceil(Instructors?.length / itemsPerPage)}`}</h5>
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
            disabled={currentPage === Math.ceil(Instructors.length / itemsPerPage)}
            onClick={() =>
              setCurrentPage(prevPage =>
                prevPage < Math.ceil(Instructors.length / itemsPerPage) ? prevPage + 1 : prevPage
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
