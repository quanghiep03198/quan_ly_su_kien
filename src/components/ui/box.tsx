import React, { forwardRef, useRef } from 'react'

type TBoxProps = { as?: React.ElementType } & React.PropsWithChildren & React.AllHTMLAttributes<HTMLElement>

export const Box: React.ForwardRefExoticComponent<TBoxProps> = forwardRef((props, ref) => {
   const { as: Component = 'div', className, style, children, ...restProps } = props

   const localRef = useRef(null)
   const resolvedRef = ref || localRef

   return (
      <Component className={className} style={style} ref={resolvedRef} {...restProps}>
         {children}
      </Component>
   )
})
