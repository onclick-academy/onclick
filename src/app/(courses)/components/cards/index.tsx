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
  category: string
}

const Card = ({ type, data }: CardProps) => {
  let cardData: CourseProps
  const { photo, title, rate, price, description } = data
  const publisher = data.CourseOwners.filter((user: UserType) => user.role === 'PUBLISHER')[0].user
  cardData = {
    photo,
    title: title,
    rate: rate || '3.5',
    price,
    avatar: publisher.profilePic,
    studentsNumber: data._count.enrollments,
    instructorName: publisher.firstName,
    reviewsNumber: '16',
    lessonsNumber: '50',
    description:
      description +
      ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Nulla porttitor accumsan tincidunt. Donec sol licitudin molestie malesuada. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
    category: data.category.title
  }

  return type === 'wide' ? <WideCard /> : <NarrowCard course={cardData} />
}

export default Card
