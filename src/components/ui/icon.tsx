import { icons } from 'lucide-react'

type IconProps = {
   name: keyof typeof icons
   color?: string
   size?: number
} & React.HTMLAttributes<HTMLOrSVGElement>

export const Icon: React.FC<IconProps> = ({ name, color, size = 16, ...props }) => {
   const LucideIcon = icons[name]
   return <LucideIcon color={color} size={size} {...props} />
}
