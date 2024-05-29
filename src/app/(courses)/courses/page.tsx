'use client'
import React from 'react'
import '../../../styles/courses.css'
import Header from '@/components/Hero/Header'
import CoursesSearch from '../components/Search'
import NarrowCard from '../components/cards/NarrowCard'
import { fetcher } from '@/utilities/fetcher'
import Card from '../components/cards'
import Pagination from '../components/Pagination'
import CourseFeedLoader from './loading'
import Link from 'next/link'

const CoursesPage = () => {
  const [courses, setCourses] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchCourses = async (page: number) => {
    try {
      setIsLoading(true)
      const data = await fetcher({
        url: `/courses?limit=10&offset=${(page - 1) * 10}`
      })
      setCourses(data.data.courses)
      setTotalPages(Math.ceil(data.data.totalCourses / 10))
      console.log('🚀 ~ fetcdsfgsfdgdsfgdfghCourses ~ data:', data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchCourses(currentPage)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='course-wrapper min-h-screen p-9 md:px-3'>
      <div className='container'>
        <div className='mb-8'>
          <nav className='text-sm text-gray-600 mb-2'>
            <Link href='/' className='hover:underline'>
              Home{' '}
            </Link>
            / All Courses
          </nav>
          <h1 className='text-4xl font-bold mb-2'>All Courses</h1>
          <p className='text-gray-700'>Courses that help beginner designers become true unicorns.</p>
        </div>
      </div>
      <div className='search-filter'>
        <CoursesSearch
          setTotalPages={setTotalPages}
          setIsLoading={setIsLoading}
          limit={10}
          offset={0}
          setCourses={setCourses}
        />
      </div>
      {isLoading ? (
        <CourseFeedLoader />
      ) : (
        <div className='courses-feed'>
          {courses && courses.map((course, index) => <Card key={index} type='narrow' data={course} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

export default CoursesPage
