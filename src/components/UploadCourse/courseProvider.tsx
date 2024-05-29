import React, { createContext, useState, useContext } from 'react'
import { boolean } from 'zod'

const CourseContext = createContext<{
  courseInfo: CourseInfo
  setCourseInfo: React.Dispatch<React.SetStateAction<CourseInfo>>
} | undefined>(undefined)

export const useCourse = () => {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider')
  }
  return context
}

interface CourseProviderProps {
  children: React.ReactNode
}

interface CourseInfo {
  title: string
  slug: string
  description: string
  price: string
  discount: string
  thumbnail: File | null
 
  dripContent: string
  difficulty: string
  settings: {
    public: boolean
    drip: boolean
    qa: boolean
  }
  introVideo: {
    Youtube: string
    local: string
  }
  categories: string[]
}

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    title: '',
    slug: '',
    description: '',
    price: '',
    discount: '',
    thumbnail: null,
    
    dripContent: '',
    difficulty: 'All Levels',
    settings: {
      public: false,
      drip: false,
      qa: false,
    },
    introVideo: {
      Youtube: '',
      local: '',
    },
    categories: [],
  })

  return (
    <CourseContext.Provider value={{ courseInfo, setCourseInfo }}>
      {children}
    </CourseContext.Provider>
  )
}

export default CourseProvider