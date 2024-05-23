import React from 'react'

import '../../../styles/courses.css'
import Header from '@/components/Hero/Header'
import Search from '../components/Search'

const CoursesPage = () => {
  return (
    <div className='course-wrapper min-h-screen p-9'>
      <Header />
      <div className='container'>
        <div className='mb-8'>
          <nav className='text-sm text-gray-600 mb-2'>
            <a href='/' className='hover:underline'>
              Home{' '}
            </a>
            / All Courses
          </nav>
          <h1 className='text-4xl font-bold mb-2'>All Courses</h1>
          <p className='text-gray-700'>Courses that help beginner designers become true unicorns.</p>
        </div>
      </div>
      <div className='search-filter'>
        <Search />
      </div>
    </div>
  )
}

export default CoursesPage
