import React, { forwardRef, useRef } from 'react'

type BoxProps = { as?: React.ElementType } & React.PropsWithChildren & React.AllHTMLAttributes<HTMLElement>

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
   const { as: Component = 'div', className, style, children, ...restProps } = props

   const localRef = useRef(null)
   const resolvedRef = ref || localRef

   return (
      <Component className={className} style={style} ref={resolvedRef} {...restProps}>
         {children}
      </Component>
   )
})
