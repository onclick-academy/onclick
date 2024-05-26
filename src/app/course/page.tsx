'use client'
import React, { use, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fetcher } from '@/utilities/fetcher'
import { Badge } from '@/components/ui/badge'
import { FaCrown } from 'react-icons/fa'
import Stars from '@/constants/Stars'
import { Button } from '@/components/ui/button'
import StarsRating from '@/constants/Star'
import { IoPeople } from 'react-icons/io5'
import { MdPlayCircleOutline } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'

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
  ratings: [{ userId: string; rate: number; comment: string }]
  discount: number
  certificate: ''
  sections: SectionI[]
}
interface UserI {
  id: string
  firstName: string
  lastName: string
  username: string
  profilePic: string | null
  bio: string
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
          <span>
            <span className='font-black'>{studentRated}</span> Rating
          </span>
          <span>
            <span className='font-black'>{studentEnrolled} </span> Enrolled{' '}
          </span>
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
    <div className='w-full sm:w-8/12 relative flex flex-col gap-2 lg:flex-row items-center justify-between mt-48'>
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
    <div className='lg:w-4/12 w-full justify-start flex flex-col rounded-md items-center h-full lg:h-screen p-3'>
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
      <Tabs defaultValue='reviews' className='h-screen'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='content'>Content</TabsTrigger>
          <TabsTrigger value='instructor'>Instructor</TabsTrigger>
          <TabsTrigger value='reviews'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='overview'>
          <CourseDataOverView courseData={courseData} />
        </TabsContent>
        <TabsContent value='content'>
          <CourseDataContent courseData={courseData} sections={sections} />
        </TabsContent>
        <TabsContent value='instructor'>
          <CourseDataInstructor courseData={courseData} instructorData={instructorData} />
        </TabsContent>
        <TabsContent value='reviews'>
          <CourseDataReviews courseData={courseData} rating={rating} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseDataOverView({ courseData }: { courseData: CourseI }) {
  return (
    <div className='p-3 flex flex-col gap-3 h-full'>
      <img src={courseData.photo} className='w-3/5 mx-auto' alt='' />
      <h1 className='sm:text-3xl text-xl font-bold text-primary'>About Course</h1>
      <span className='text-gray-400 p-4'>{courseData.description}</span>
    </div>
  )
}

function CourseDataContent({
  courseData,
  sections
}: {
  courseData: CourseI
  sections: SectionI[]
}) {
  // TODO : Fix Copilot Issues
  return (
    <div className='p-3 flex flex-col gap-3 h-full'>
      <h1 className='sm:text-3xl text-xl font-bold text-primary'>Course Content</h1>
      <div className='flex flex-col gap-3 w-full'>
        {sections.map((section, index) => (
          <div key={index} className='flex flex-col gap-3 w-full'>
            <h2 className='text-xl font-bold'>{section.content}</h2>
            <div className='flex flex-col gap-3 w-full'>
              {section.lectures.map((lecture, index) => (
                <div key={index} className='flex flex-col gap-3 w-full'>
                  <h3 className='text-lg font-bold'>{lecture.title}</h3>
                  <span className='text-gray-400'>{lecture.description}</span>
                  <video controls className='w-full'>
                    <source src={lecture.videoUrl} type='video/mp4' />
                  </video>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CourseDataInstructor({ courseData, instructorData }: { courseData: CourseI; instructorData: UserI }) {
  const [instructorRate, setInstructorRate] = useState(0)
  const [reviewers, setReviewers] = useState(0)
  const [instructorCourses, setInstructorCourses] = useState(0)
  const [instructorStudents, setInstructorStudents] = useState(0)

  useEffect(() => {
    const getInstructorRate = async () => {
      const url = `/ratings/instructor/rate/${instructorData.id}`
      const response = await fetcher({ url })
      const ratings = response.data
      if (!ratings.length) setInstructorRate(0)
      const sum = ratings.length && ratings.reduce((acc: number, curr: any) => acc + curr.rating, 0)
      const avg = sum / ratings.length
      setInstructorRate(avg ? avg : 0)
      setReviewers(ratings.length ? ratings.length : 0)
    }

    const getInstructorCourses = async () => {
      const url = `/courses/instructor/${instructorData.id}`
      const response = await fetcher({ url })
      setInstructorCourses(response.data.length ? response.data.length : 0)
    }

    const getInstructorStudents = async () => {
      const url = `/courseEnrolls/instructor/${instructorData.id}`
      const response = await fetcher({ url })
      setInstructorStudents(response.data.length ? response.data.length : 0)
    }

    getInstructorRate()
    getInstructorCourses()
    getInstructorStudents()
  }, [courseData, instructorData])

  console.log(instructorData)

  return (
    <div className='p-3 flex flex-col gap-3 h-full w-full'>
      <div className='w-full flex items-center justify-center rounded-full'>
        <img src={instructorData.profilePic} alt='Instructor Image' className='w-36 sm:w-44 rounded-full ' />
      </div>

      <div className='flex flex-col w-full items-center gap-4 p-2'>
        <h2 className='text-xl font-bold'>
          {instructorData.firstName} {instructorData.lastName}
        </h2>

        <div className='flex w-full flex-col gap-2'>
          <div className='w-full flex justify-evenly '>
            <span className='flex gap-2 text-gray-400'>
              <span className='flex items-center gap-1'>
                <FaStar className='text-orange-500' /> {reviewers}
              </span>{' '}
              {reviewers > 1 ? 'Reviews' : 'Review'}
            </span>
            <span className='flex gap-1 bg-gray-100 px-2 rounded-xl items-center text-sm text-slate-500'>
              {' '}
              <span>{instructorRate}</span>
              <span className='flex items-center'>Rating</span>
            </span>{' '}
          </div>

          <div className='w-full flex justify-evenly'>
            <span className='flex gap-2  text-gray-400'>
              <span className='flex items-center gap-1'>
                <IoPeople /> {instructorStudents}
              </span>{' '}
              {instructorStudents > 1 ? 'Students' : 'Student'}
            </span>

            <span className='flex gap-2  text-gray-400'>
              <span className='flex items-center gap-1'>
                <MdPlayCircleOutline /> {instructorCourses}
              </span>{' '}
              {instructorCourses > 1 ? 'Courses' : 'Course'}
            </span>
          </div>
        </div>

        <div className='my-2 flex flex-col gap-3'>
          <h1 className='text-xl font-bold text-primary'>About Instructor:</h1>
          <p className='flex gap-1 bg-gray-100 px-2 rounded-xl items-center text-base text-slate-500'>
            {instructorData.bio} {instructorData.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

function CourseDataReviews({ courseData, rating }: { courseData: CourseI; rating: number }) {

  let Star1 = 0
  let Star2 = 0
  let Star3 = 0
  let Star4 = 0
  let Star5 = 0
  let reviewsForFiveStars: { userId: string; rate: number; comment: string }[] = []

  if (courseData.ratings) {
   Star1 = courseData && courseData.ratings.filter(rating => rating.rate > 0 && rating.rate < 1.5).length
   Star2 = courseData && courseData.ratings.filter(rating => rating.rate >= 1.5 && rating.rate < 2.5).length
   Star3 = courseData && courseData.ratings.filter(rating => rating.rate >= 2.5 && rating.rate < 3.5).length
   Star4 = courseData && courseData.ratings.filter(rating => rating.rate >= 3.5 && rating.rate < 4.5).length
   Star5 = courseData && courseData.ratings.filter(rating => rating.rate >= 4.5 && rating.rate <= 5).length

   reviewsForFiveStars = courseData && courseData.ratings.filter(rating => rating.rate === 5)
  }
  console.log(" reviewsForFiveStars ", reviewsForFiveStars)
  return (
    <div className='p-3 flex flex-col gap-3 h-full w-full'>
      <div className='flex w-full gap-2 flex-col items-center justify-center p-8 bg-gray-300'>
        <span className='text-gray-400'>{rating.toFixed(1)}</span>
        <StarsRating rating={rating} size={22} readOnly />
        <p>Course Rating</p>
      </div>

      <div className='flex gap-3 p-3 w-full flex-col items-center justify-center my-2'>
        <div className='flex gap-2 w-full items-center justify-evenly'>
          <StarsRating rating={1} size={40} readOnly />
          <span className='text-gray-400'>
            {Star1} {Star1 > 1 ? 'Students' : 'Student'}
          </span>
        </div>
        <div className='flex gap-2  w-full items-center justify-evenly'>
          <StarsRating rating={2} size={40} readOnly />
          <span className='text-gray-400'>
            {Star2} {Star2 > 1 ? 'Students' : 'Student'}
          </span>
        </div>
        <div className='flex gap-2  w-full items-center justify-evenly'>
          <StarsRating rating={3} size={40} readOnly />
          <span className='text-gray-400'>
            {Star3} {Star3 > 1 ? 'Students' : 'Student'}{' '}
          </span>
        </div>
        <div className='flex gap-2  w-full items-center justify-evenly'>
          <StarsRating rating={4} size={40} readOnly />
          <span className='text-gray-400'>
            {Star4} {Star4 > 1 ? 'Students' : 'Student'}
          </span>
        </div>
        <div className='flex gap-2  w-full items-center justify-evenly'>
          <StarsRating rating={5} size={40} readOnly />
          <span className='text-gray-400'>
            {Star5} {Star5 > 1 ? 'Students' : 'Student'}
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-3 w-full'>
        <h1 className='text-xl font-bold text-primary border-b border-blue-100'>Reviews</h1>
        <div className='flex flex-col gap-3 w-full'>
          {reviewsForFiveStars.map((review, index) => (
            <ReviewComponent key={index} review={courseData.ratings[0]} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ReviewComponent({ review }: { review: { userId: string; rate: number; comment: string } }) {
  const [user, setUser] = useState({} as UserI)

  useEffect(() => {
    const getUser = async () => {
      const url = `/users/${review.userId}`
      const response = await fetcher({ url })
      setUser(response.data)
    }

    getUser()
  }, [review.userId])

  return (
    <div className='flex gap-3 p-3'>
      <div className='sm:w-5/12 flex justify-center items-center'>
        <img src={user.profilePic} alt='User Profile' className='p-2' />
      </div>

      <div className='flex gap-3 p-5 flex-col'>
        <h1 className='text-lg font-bold'>{user.firstName} {user.lastName}</h1>
        <StarsRating rating={review.rate} size={16} readOnly />
        <p className='text-sm text-gray-500'>{review.comment}</p>
      </div>
    </div>
  )
}
