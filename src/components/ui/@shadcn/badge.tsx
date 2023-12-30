import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/common/utils/cn'

const badgeVariants = cva(
   'inline-flex cursor-default items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
   {
      variants: {
         variant: {
            default: 'border-transparent bg-primary/5 text-primary shadow hover:bg-primary/10',
            success: 'border-transparent bg-success/5 text-success shadow hover:bg-success/10',
            secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive/5 text-destructive shadow hover:bg-destructive/10',
            outline: 'text-foreground'
         }
      },
      defaultVariants: {
         variant: 'default'
      }
   }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
   return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
