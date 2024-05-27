'use client'
import React from 'react'

const CourseFeedLoader = () => {
  const arr = Array.from({ length: 12 }, (_, i) => i + 1)
  return (
    <div className='courses-feed'>
      {arr.map((_, i) => (
        <div key={i} className='bg-white-100 rounded-lg shadow-md overflow-hidden animate-pulse'>
          <div className='relative w-full h-48 bg-gray-300'></div>
          <div className='p-4'>
            <div className='flex items-center'>
              <div className='w-20 h-4 bg-gray-300 rounded'></div>
              <span className='w-10 h-4 bg-gray-300 rounded ml-2'></span>
            </div>
            <h2 className='w-1/2 h-6 bg-gray-300 rounded mt-2'></h2>
            <div className='flex items-center mt-2'>
              <div className='w-16 h-4 bg-gray-300 rounded mr-4'></div>
              <div className='w-16 h-4 bg-gray-300 rounded'></div>
            </div>
            <p className='w-full h-4 bg-gray-300 rounded mt-2'></p>
            <p className='w-3/4 h-4 bg-gray-300 rounded mt-2'></p>
            <div className='flex items-center mt-4'>
              <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
              <div className='ml-3 w-1/3 h-4 bg-gray-300 rounded'></div>
            </div>
            <div className='flex items-center mt-4'>
              <span className='w-10 h-6 bg-gray-300 rounded'></span>
              <span className='w-8 h-6 bg-gray-300 rounded ml-2'></span>
            </div>
            <div className='w-20 h-4 bg-gray-300 rounded mt-4'></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CourseFeedLoader
