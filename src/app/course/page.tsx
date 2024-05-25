'use client'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetcher } from '@/utilities/fetcher'
import { Badge } from '@/components/ui/badge'
import { FaCrown } from 'react-icons/fa'
import Stars from '@/constants/Stars'
import { set } from 'date-fns'
import { Button } from '@/components/ui/button'

function convertDate(dateStr: string): string {
  const dateObj = new Date(dateStr)

  const day = dateObj.getUTCDate()
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const year = dateObj.getUTCFullYear()

  const formattedDate = `${day} ${month}, ${year}`

  return formattedDate
}

interface TopicsDataI {
  title: string
  id: string
}

interface CourseI {
  id: string
  title: string
  photo: string
  topics: TopicsDataI[]
  categoryId: string
  publisher: UserI
  createdAt: string
  updatedAt: string
  introVideo: string
  description: string
  price: number
  avrageRating: number
  courseOwners: UserI[]
  category: {
    title: string
  }
  enrollments: []
  ratings: []
  discount: number
  certificate: ''
}
interface UserI {
  id: string
  firstName: string
  lastName: string
  username: string
  profilePic: string | null
}

interface CategoryI {
  title: string
}

interface LectureI {
  id: string
  sectionId: string
  order: number
  title: string
  description: string
  videoUrl: string
  duration: string
  thumbnail: string
}

interface SectionI {
  id: string
  courseId: string
  content: string
  fullduration: string
  lectures: LectureI[]
}

export default function CourseLandingPage({ id }: { id: string }) {
  const [courseData, setCourseData] = useState({} as CourseI)
  const [rating, setRating] = useState(0)
  const [categoryTitle, setCategoryTitle] = useState('' as CategoryI['title'])
  const [instructorData, setInstructorData] = useState({} as UserI)
  const [topicsData, setTopicsData] = useState([] as TopicsDataI[])
  const [sections, setSections] = useState([] as SectionI[])
  const [bestSeller, setBestSeller] = useState(false)
  const [studentRated, setStudentRated] = useState(0)
  const [studentEnrolled, setStudentEnrolled] = useState(0)

  useEffect(() => {
    const getCourseData = async () => {
      const courseId = id
      const url = `/courses/${courseId}`
      const response = await fetcher({ url })
      return response
    }

    const fetchData = async () => {
      const fetchedCourseData = await getCourseData()
      console.log(' fetchedCourseData ', fetchedCourseData)
      const fetchedCategory = fetchedCourseData.data.category
      setCourseData(fetchedCourseData.data)
      setCategoryTitle(fetchedCategory.title)
      setRating(fetchedCourseData.data.avrageRating ? fetchedCourseData.data.avrageRating : 0)
      // setRating(4.5)
      setStudentRated(fetchedCourseData.data.ratings.length ? fetchedCourseData.data.ratings.length : 0)
      setInstructorData(fetchedCourseData.data.CourseOwners[0].user)
      setTopicsData(fetchedCourseData.data.topics)
      setSections(fetchedCourseData.data.sections)
      if (fetchedCourseData.data.enrollments.length > 1000) setBestSeller(true)
      setStudentEnrolled(fetchedCourseData.data.enrollments.length ? fetchedCourseData.data.enrollments.length : 0)
    }

    fetchData()
  }, [id])
  console.log(instructorData)

  return (
    <div className='flex flex-col gap-4 items-center'>
      <HeaderSection
        courseData={courseData}
        rating={rating}
        categoryTitle={categoryTitle}
        instructorData={instructorData}
        topicsData={topicsData}
        bestSeller={bestSeller}
        studentRated={studentRated}
        studentEnrolled={studentEnrolled}
      />
      <CourseIntroSection courseData={courseData} />
      <CourseDataSection
        courseData={courseData}
        rating={rating}
        categoryTitle={categoryTitle}
        instructorData={instructorData}
        topicsData={topicsData}
        bestSeller={bestSeller}
        studentRated={studentRated}
        studentEnrolled={studentEnrolled}
        sections={sections}
      />
    </div>
  )
}

function HeaderSection({
  courseData,
  rating,
  categoryTitle,
  instructorData,
  topicsData,
  bestSeller,
  studentRated,
  studentEnrolled
}: {
  courseData: CourseI
  rating: number
  categoryTitle: CategoryI['title']
  instructorData: UserI
  topicsData: TopicsDataI[]
  bestSeller: boolean
  studentRated: number
  studentEnrolled: number
}) {
  return (
    <div className='bg-gradient-to-r from-sky-400 to-cyan-900 w-full flex flex-col items-center justify-center pt-12 pb-56'>
      <div className='w-9/12 flex flex-col gap-3 justify-center items-center'>
        <div className='w-12/12 sm:w-9/12 flex items-center justify-around gap-3 sm:gap-4 p-4'>
          {bestSeller && (
            <div className='bg-gradient-to-r from-sky-400 to-slate-600 flex gap-2 border rounded-3xl px-1 py-3 sm:p-3 items-center'>
              <FaCrown className='text-lg text-amber-600' /> <span className='text-slate-300'>BestSeller</span>
            </div>
          )}
          {!rating ? (
            <span>No rating yet</span>
          ) : (
            <span className='font-black'>
              {rating} <Stars fill={rating} half={rating % 1} size={24} color='' />
            </span>
          )}
          <span><span className='font-black'>{studentRated}</span> Rating</span>
          <span><span className='font-black'>{studentEnrolled} </span> Enrolled </span>
        </div>
        <h1 className='sm:w-9/12 w-11/12 text-center text-3xl font-black p-4'>{courseData.title}</h1>
        <div className='w-7/12 flex flex-col sm:flex-row gap-2 items-center justify-center'>
          <img src={instructorData.profilePic} alt='Instructor Avatar' className='w-10 h-10 rounded-full' />
          <p className='text-xs text-gray-500'>
            By{' '}
            <span className='font-extrabold text-black'>
              {instructorData.firstName} {instructorData.lastName}
            </span>{' '}
            in <span className='font-extrabold text-black'>{categoryTitle}</span>
          </p>
        </div>
        <div className='sm:w-8/12 w-full flex flex-col sm:flex-row gap-2 p-4 items-center justify-center'>
          <p className='text-xs flex gap-1 items-center'>
            <span>Last Updated: </span>
            <span>{convertDate(courseData.updatedAt)}</span>
          </p>
          <p className='text-xs flex gap-1 items-center'>
            Topics:{' '}
            {topicsData.map(topic => (
              <Badge variant='outline' key={topic.id}>
                {topic.title}
              </Badge>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

function CourseIntroSection({ courseData }: { courseData: CourseI }) {
  return (
    <div className='w-full flex justify-center items-center static'>
      {courseData && (
        <div className='w-8/12 flex items-center justify-center absolute bottom-13'>
          <div className='w-full flex justify-center bg-primary'>
            <iframe
              width='100%'
              height='360'
              src={courseData.introVideo}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

function CourseDataSection({
  courseData,
  rating,
  categoryTitle,
  instructorData,
  topicsData,
  bestSeller,
  studentRated,
  studentEnrolled,
  sections
}: {
  courseData: CourseI
  rating: number
  categoryTitle: CategoryI['title']
  instructorData: UserI
  topicsData: TopicsDataI[]
  bestSeller: boolean
  studentRated: number
  studentEnrolled: number
  sections: SectionI[]
}) {
  return (
    <div className='w-8/12 relative flex flex-col gap-2 lg:flex-row items-center justify-between mt-48'>
      <CourseDataAside
        courseData={courseData}
        rating={rating}
        categoryTitle={categoryTitle}
        instructorData={instructorData}
        topicsData={topicsData}
        bestSeller={bestSeller}
        studentRated={studentRated}
        studentEnrolled={studentEnrolled}
        sections={sections}
      />
      <CourseDataMain
        courseData={courseData}
        rating={rating}
        categoryTitle={categoryTitle}
        instructorData={instructorData}
        topicsData={topicsData}
        bestSeller={bestSeller}
        studentRated={studentRated}
        studentEnrolled={studentEnrolled}
        sections={sections}
      />
    </div>
  )
}

function CourseDataAside({
  courseData,
  rating,
  categoryTitle,
  instructorData,
  topicsData,
  bestSeller,
  studentRated,
  studentEnrolled,
  sections
}: {
  courseData: CourseI
  rating: number
  categoryTitle: CategoryI['title']
  instructorData: UserI
  topicsData: TopicsDataI[]
  bestSeller: boolean
  studentRated: number
  studentEnrolled: number
  sections: SectionI[]
}) {
  const [enrolled, setEnrolled] = useState(false)
  const [wishListed, setWishListed] = useState(false)
  const [wishListID, setWishListID] = useState('')

  const courseId = courseData.id

  const handleEnrollment = async () => {
    // console.log('Enrolled')
    const url = '/courseEnrolls'
    const data = {
      courseId: courseId
    }
    const res = await fetcher({ url, method: 'POST', body: data })

    if (res.status === 'success') window.alert('Enrolled successfully')
    if (res.status !== 'success') window.alert("You are already enrolled in this course or there's a problem")
  }

  useEffect(() => {
    const checkWishListed = async () => {
      try {
        const url = `/wishlist/isWishListed/${courseId}`
        const res = await fetcher({ url })
        console.log('res wishlisted', res)

        if (res.data) {
          setWishListed(true)
        } else {
          setWishListed(false)
        }
      } catch (error) {
        console.error('Error checking wishlist:', error)
        setWishListed(false)
      }
    }

    const checkEnrollment = async () => {
      const url = `/courseEnrolls/${courseId}`
      const res = await fetcher({ url })
      if (res.data) {
        setEnrolled(true)
      } else {
        setEnrolled(false)
      }
    }

    const fetchData = async () => {
      await checkWishListed()
      await checkEnrollment()
    }
    fetchData()
  }, [courseId])

  const handleAddToWishList = async () => {
    const url = '/wishlist'
    const data = {
      courseId: courseId
    }
    const res = await fetcher({ url, method: 'POST', body: data })

    if (res.status === 'success') {
      setWishListID(res.data.id)
      window.alert('Added To Wish List successfully')
    }
    if (res.status === 500) window.alert('You have already added this course to your wishlist')
  }

  const handleDeleteFromWishList = async () => {
    const url = `/wishlist/${wishListID}`
    const res = await fetcher({ url, method: 'DELETE' })

    if (res.status === 'success') {
      setWishListed(false)
      window.alert('Removed from Wishlist successfully')
    }

    if (res.status === 500) window.alert('There was a problem removing this course from your wishlist')
  }

  return (
    <div className='lg:w-4/12 w-full justify-start flex flex-col rounded-md items-center h-screen p-3'>
      <div className='w-full p-3 flex  justify-between'>
        {courseData.discount ? (
          <div className='flex gap-3 items-center'>
            <span className='text-xl md:text-lg text-gray-500'>
              ${(courseData.price - (courseData.price * courseData.discount) / 100).toFixed(2)}
            </span>
            <span className='line-through text-gray-400 text-lg md:text-base'>${courseData.price}</span>
          </div>
        ) : (
          <div>Price: ${courseData.price}</div>
        )}
        {courseData.discount && (
          <div>
            <Badge variant='outline'>Limited</Badge>
          </div>
        )}
      </div>

      <div
        className={`${
          wishListed ? 'flex gap-4 justify-center' : ''
        } btn-wish w-full p-3 flex-col sm:flex-row md:flex-col `}
      >
        <Button
          className={`${!wishListed ? 'w-full' : 'w-6/12'} md:w-full sm:w-1/2 w-full btn-wish`}
          onClick={handleAddToWishList}
          disabled={wishListed}
        >
          {wishListed ? 'Added To Wishlist' : 'Add to Wishlist'}
        </Button>
        {wishListed && (
          <Button onClick={handleDeleteFromWishList} className='bg-red-600 w-6/12 md:w-full sm:w-1/2 w-full '>
            Remove from Wishlist
          </Button>
        )}
      </div>

      <div className='w-full p-3'>
        <Button onClick={handleEnrollment} disabled={enrolled} className='w-full'>
          {enrolled ? 'Enrolled, Keep Learning!' : 'Enroll Now'}
        </Button>
      </div>

      <div className='w-full p-3 flex items-center'>
        {!studentEnrolled ? (
          <span className='w-full text-center border-b text-gray-500 py-2 border-slate-300'>
            No Students Enrolled Yet, Be The First!
          </span>
        ) : (
          <div className='w-full flex justify-between border-b border-slate-300 p-3'>
            <span className='text-gray-400 font-bold'>Students Enrolled</span>
            <span className='bg-slate-200 px-1 rounded-sm'>{studentEnrolled}</span>
          </div>
        )}
      </div>

      <div className='w-full p-3 flex justify-between border-b border-slate-300'>
        <span className=' text-gray-400 font-bold'>Sections </span>
        <span className='bg-slate-200 px-1 rounded-sm'>{sections.length}</span>
      </div>

      <div className='w-full p-3 flex justify-between border-b border-slate-300'>
        <span className=' text-gray-400 font-bold'>Duration </span>
        <span className='bg-slate-200 px-1 rounded-sm'>
          {sections.reduce((acc, curr) => acc + parseInt(curr.fullduration), 0)} Hours
        </span>
      </div>

      <div className='w-full p-3 flex justify-between border-b border-slate-300'>
        <span className=' text-gray-400 font-bold'>Certificate </span>
        <span className='bg-slate-200 px-1 rounded-sm'>{courseData.certificate ? 'Yes' : ' No'}</span>
      </div>

      <div className='w-full p-3 flex justify-between'>
        <span className=' text-gray-400 font-bold'>Lectures</span>
        <span className='bg-slate-200 px-1 rounded-sm'>
          {sections.reduce((acc, curr) => acc + curr.lectures.length, 0)}
        </span>
      </div>

      <div className='w-full p-3'>
        <Button
          className='w-full'
          onClick={() => {
            console.log('TODO')
          }}
        >
          Start Learning
        </Button>
      </div>
    </div>
  )
}

function CourseDataMain({
  courseData,
  rating,
  categoryTitle,
  instructorData,
  topicsData,
  bestSeller,
  studentRated,
  studentEnrolled,
  sections
}: {
  courseData: CourseI
  rating: number
  categoryTitle: CategoryI['title']
  instructorData: UserI
  topicsData: TopicsDataI[]
  bestSeller: boolean
  studentRated: number
  studentEnrolled: number
  sections: SectionI[]
}) {
  return (
    <div className='lg:w-8/12 w-full flex flex-col rounded-md justify-center items-center h-full'>
      {/* <CourseDataOverView />
      <CourseDataContent />
      <CourseDataDetails />
      <CourseDataInstructor />
      <CourseDataReviews />
      */}
      <Tabs defaultValue='overview' className='h-screen'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='instructor'>Instructor</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <CourseDataOverView courseData={courseData}/>
        </TabsContent>
        <TabsContent value='instructor'>
          <CourseDataInstructor />
        </TabsContent>
        <TabsContent value='reviews'>
          <CourseDataReviews />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseDataOverView({
  courseData
}: {
  courseData: CourseI
}) {
  return (
    <div className='p-3 flex flex-col gap-3 h-full'>
      <img src={courseData.photo} className='w-3/5 mx-auto' alt="" />
      <h1 className='sm:text-3xl text-xl font-bold text-primary'>About Course</h1>
      <span className='text-gray-400 p-4'>
        {courseData.description}
      </span>
    </div>
  )
}

function CourseDataInstructor() {
  return (
    <div>
      <h1>Course Data Instructor</h1>
    </div>
  )
}

function CourseDataReviews() {
  return (
    <div>
      <h1>Course Data Reviews</h1>
    </div>
  )
}

