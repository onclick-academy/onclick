import React from 'react'

interface BtnProps {
  children: React.ReactNode
  className?: string
}

const Btn: React.FC<BtnProps> = ({ children, className = '' }) => {
  const combinedClassName = `${className} btn text-base text-center flex items-center justify-center`

  return (
    <button color='white' className={combinedClassName}>
      {children}
    </button>
  )
}

export default Btn
