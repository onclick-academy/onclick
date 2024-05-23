'use client'
import SearchIcon from '@/media/svgs/SearchIcon'
import Dropdown from '@/media/svgs/dropdown'
import DropUp from '@/media/svgs/dropup'
import React, { useState } from 'react'

const Search = () => {
  const [hidden, setHidden] = useState('hidden')
  const [categories, setCategories] = useState([
    { id: 1, name: 'Mockups' },
    { id: 2, name: 'Templates' },
    { id: 3, name: 'Design' },
    { id: 4, name: 'Logos' }
  ])

  const handleDropdown = () => {
    setHidden(hidden === 'hidden' ? '' : 'hidden')
  }
  return (
    <form className='mt-16'>
      <div className='flex'>
        <div className='dropdown-container'>
          <button
            id='dropdown-button'
            data-dropdown-toggle='dropdown'
            className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200'
            type='button'
            onClick={handleDropdown}
          >
            All categories
            {hidden === 'hidden' ? <DropUp /> : <Dropdown />}
          </button>
          <div
            id='dropdown'
            className={`dropdown-list ${hidden} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul className=' py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdown-button'>
              {categories.map(category => (
                <li key={category.id} className='pl-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
                  <button className='block p-2'>{category.name}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='relative w-full'>
          <input
            type='search'
            id='search-dropdown'
            className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg'
            placeholder='Search Courses with Categories, Topics, etc.'
            required
          />
          <button
            type='submit'
            className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg  hover:bg-blue-800 '
          >
            <SearchIcon />
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
