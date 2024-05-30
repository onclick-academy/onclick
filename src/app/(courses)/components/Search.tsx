'use client'
import SearchIcon from '../../../lib/svgs/SearchIcon'
import Dropdown from '../../../lib/svgs/dropdown'
import DropUp from '../../../lib/svgs/dropup'
import { fetcher } from '@/utilities/fetcher'
import React, { useEffect, useState } from 'react'

interface Category {
  id: string
  title: string
}

type CourseSearchProps = {
  setCourses: (courses: any) => void
  offset: number
  limit: number
  setIsLoading: (loading: boolean) => void
  setTotalPages: (totalPages: number) => void
}

const CoursesSearch = ({ setTotalPages, setCourses, offset, limit, setIsLoading }: CourseSearchProps) => {
  const [hidden, setHidden] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const fetchCategories = async () => {
    try {
      const data = await fetcher({ url: '/categories' })
      console.log('🚀 ~ fetchCategories ~ data:', data)
      setCategories(data.data)
    } catch (error) {
      console.log('🚀 ~ useEffect ~ error', error)
    }
  }

  const fetchCourses = async (search: string, category: string = '') => {
    try {
      setIsLoading(true)
      const url = `/courses?search=${search}&offset=${offset}&limit=${limit}`
      const data = await fetcher({ url })
      setCourses(data.data.courses)
      if (category == '') setSelectedCategory('')
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategoryCourses = async (category: { title: string; id: string }) => {
    try {
      setIsLoading(true)
      setSelectedCategory(category.title)
      setHidden(true)
      const url = `/courses/category/${category.id}?offset=${offset}&limit=${limit}`
      const data = await fetcher({ url })
      setCourses(data.data)
      setTotalPages(Math.ceil(data.data.totalCourses / 10))
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDropdown = () => {
    setHidden(!hidden)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    fetchCourses(searchTerm, selectedCategory)
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.title)
    fetchCategoryCourses(category)
    setHidden(true)
  }

  return (
    <form className='my-16 max-w-4xl mx-24' onSubmit={handleSearchSubmit}>
      <div className='search-container flex'>
        <div className='dropdown-container'>
          <button
            id='dropdown-button'
            data-dropdown-toggle='dropdown'
            className='z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-s-lg hover:bg-gray-200'
            type='button'
            aria-haspopup='true'
            aria-expanded={hidden ? 'false' : 'true'}
            onClick={handleDropdown}
          >
            {selectedCategory || 'All categories'}
            {hidden ? <DropUp /> : <Dropdown />}
          </button>
          <div id='dropdown' className={`dropdown-list ${hidden ? 'hidden' : ''}`}>
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdown-button'>
              <li className='pl-2 hover:bg-gray-300 dark:hover:bg-gray-800'>
                <button
                  onClick={() => {
                    setSelectedCategory('')
                    fetchCourses('')
                    setHidden(true)
                  }}
                  className='block p-2'
                >
                  All categories
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id} className='pl-2 hover:bg-gray-300 dark:hover:bg-gray-800'>
                  <button onClick={() => handleCategorySelect(category)} className='block p-2'>
                    {category.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='relative w-full'>
          <input
            type='search'
            id='search-dropdown'
            className='block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg'
            placeholder='Search Courses with Categories, Topics, etc.'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            type='submit'
            className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg hover:bg-primary-800'
          >
            <SearchIcon />
            <span className='sr-only'>Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default CoursesSearch
