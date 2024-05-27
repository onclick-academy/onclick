import React from 'react'
import WideCard from './WideCard'
import NarrowCard from './NarrowCard'

interface CardProps {
  type: 'wide' | 'narrow'
  data: any
}

type UserType = {
  role: string
  user: {
    profilePic: string
    name: string
  }
}

export type CourseProps = {
  photo: string
  title: string
  rate: string
  price: number
  lessonsNumber: string
  description: string
  avatar: string
  studentsNumber: number
  instructorName: string
  reviewsNumber: string
}

const Card = ({ type, data }: CardProps) => {
  let cardData: CourseProps
  const { photo, title, rate, price, description } = data
  const publisher = data.CourseOwners.filter((user: UserType) => user.role === 'PUBLISHER')[0].user
  cardData = {
    photo,
    title,
    rate: rate || '3.5',
    price,
    avatar: publisher.profilePic,
    studentsNumber: data._count.enrollments,
    instructorName: publisher.name,
    reviewsNumber: '16',
    lessonsNumber: '50',
    description
  }

  return type === 'wide' ? <WideCard /> : <NarrowCard course={data} />
}

export default Card
