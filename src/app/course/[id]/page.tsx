'use client'
import { useParams } from 'next/navigation'
import CourseLandingPage from '../page'

export default function CoursePage() {
  const { id } = useParams()
  return (
    <>
      <CourseLandingPage id={id as string} />
    </>
  )
}
