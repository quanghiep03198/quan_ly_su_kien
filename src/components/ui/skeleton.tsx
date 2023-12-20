import { cn } from '@/common/utils/cn'

declare type SkeletonProps = React.PropsWithChildren & React.HTMLAttributes<HTMLDivElement>

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
   return <div className={cn('animate-pulse rounded-md bg-primary/10', className)} {...props} />
}

export { Skeleton }
