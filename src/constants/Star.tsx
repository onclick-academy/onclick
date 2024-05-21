import React, { useState } from 'react'

type StarProps = {
  size: number
  color: string
  filled: boolean
  readOnly: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

const Star: React.FC<StarProps> = ({ size, color, filled, readOnly, onMouseEnter, onMouseLeave, onClick }) => (
  <svg
    className=''
    aria-hidden='true'
    role='button'
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    fill={filled ? color : 'none'}
    stroke={color}
    viewBox='0 0 24 24'
    onMouseEnter={readOnly ? undefined : onMouseEnter}
    onMouseLeave={readOnly ? undefined : onMouseLeave}
    onClick={readOnly ? undefined : onClick}
    style={{ cursor: readOnly ? 'default' : 'pointer' }}
  >
    <path d='M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z' />
  </svg>
)

type StarRatingProps = {
  rating?: number
  size?: number
  color?: string
  readOnly?: boolean
  onRate?: (rating: number) => void
}

const StarsRating: React.FC<StarRatingProps> = ({
  rating: initialRating = 0,
  onRate,
  size = 70,
  color = '#FF8F3C',
  readOnly = false
}) => {
  const [rating, setRating] = useState<number>(initialRating)
  const [hoverRating, setHoverRating] = useState<number>(0)

  const handleRate = (rate: number) => {
    if (!readOnly) {
      setRating(rate)
      if (onRate) onRate(rate)
    }
    console.log(rate)
  }

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          color={color}
          filled={i < (hoverRating || rating)}
          readOnly={readOnly}
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleRate(i + 1)}
        />
      ))}
    </div>
  )
}

export default StarsRating
