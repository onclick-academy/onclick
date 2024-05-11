export default function Stars({ fill, half, size = 24, color = '#FF8F3C' }: {
  fill: number
  half: number
  size: number
  color: string
}) {
  return (
    <div className="flex gap-x-0.5">
      {[...Array(fill)].map((_, index) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={size}
             height={size}
             viewBox="0 0 24 24"
             fill={`${color}`}
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             key={`star-${index}`}
             className={`lucide lucide-star text-[${color}]`}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      {[...Array(half)].map((_, index) => (
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill={`${color}`}
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             key={`star-half-${index}`}
             className={`lucide lucide-star-half text-[${color}]`}>
          <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
        </svg>
      ))}
    </div>
  )
}


// <svg xmlns="http://www.w3.org/2000/svg"
//      width="24"
//      height="24"
//      viewBox="0 0 24 24"
//      fill="none"
//      stroke="currentColor"
//      stroke-width="2"
//      stroke-linecap="round"
//      stroke-linejoin="round"
//      className="lucide lucide-star">
//   <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
// </svg>
