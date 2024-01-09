import React, { useState } from 'react'
import { Icon, Skeleton } from '..'
import { cn } from '@/common/utils/cn'

type ImageProps = { fallback?: string } & React.ImgHTMLAttributes<HTMLImageElement>

export const Image: React.FC<ImageProps> = (props) => {
   const [error, setError] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(false)

   const handleLoad = () => {
      setLoading(false)
   }

   const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setError(true)
      if (props.fallback) e.currentTarget.src = props.fallback
   }

   return (
      <>
         <Skeleton style={{ width: props.width, height: props.height, display: loading ? 'block' : 'none' }} />
         <img
            loading='lazy'
            className={cn(props.className, { hidden: loading || error })}
            src={props.src}
            onLoad={handleLoad}
            onError={handleError}
            width={props.width}
            height={props.height}
         />
         {!props.fallback && (
            <div
               className={cn(props.className, '!m-0 items-center justify-center rounded-lg bg-accent/50')}
               style={{ width: props.width, height: props.height, display: error ? 'flex' : 'none' }}
            >
               <Icon name='Image' size={32} strokeWidth={1} className='text-muted-foreground/50' />
            </div>
         )}
      </>
   )
}
