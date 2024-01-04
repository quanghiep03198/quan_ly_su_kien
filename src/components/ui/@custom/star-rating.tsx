import React, { useState } from 'react'
import { Icon } from '..'

type StarRatingProps = React.InputHTMLAttributes<HTMLInputElement>

const values = [
   { id: 'rate-1', value: 1 },
   { id: 'rate-2', value: 2 },
   { id: 'rate-3', value: 3 },
   { id: 'rate-4', value: 4 },
   { id: 'rate-5', value: 5 }
]
const StarRating: React.FC<StarRatingProps> = ({ onChange, ...props }) => {
   const [value, setValue] = useState<number>(5)
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(+e.target.value)
      if (onChange) onChange(e)
   }

   return (
      <div className='relative inline-flex items-center gap-x-1'>
         {values.map((item) => (
            <div key={item.id}>
               <input type='radio' id={item.id} className='hidden' name='rating' value={item.value} onChange={handleChange} {...props} />
               <label htmlFor={item.id}>
                  <Icon stroke='#eab308' name='Star' fill={value! >= item.value ? '#eab308' : undefined} />
               </label>
            </div>
         ))}
      </div>
   )
}

export default StarRating
