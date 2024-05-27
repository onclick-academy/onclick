// src/components/Pagination.tsx
'use client'
import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className='flex justify-center mt-16'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 mx-1 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
      >
        Previous
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 border rounded-lg ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 mx-1 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
