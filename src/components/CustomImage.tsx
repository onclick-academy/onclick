import { useState } from 'react'
import Image from 'next/image'

type CustomImageProps = {
  src: string
  alt: string
  className?: string
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive'
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholderSrc?: string
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  className,
  layout = 'fill',
  objectFit = 'cover',
  placeholderSrc = '/images/course-placeholder-cover.jpg'
}) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      layout={layout}
      objectFit={objectFit}
      onError={() => setImgSrc(placeholderSrc)}
    />
  )
}

export default CustomImage
