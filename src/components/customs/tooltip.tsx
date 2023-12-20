import { Tooltip as TooltipWrapper, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

type TooltipProps = { content: string } & React.PropsWithChildren

const Tooltip: React.FC<TooltipProps> = (props) => {
   return (
      <TooltipProvider>
         <TooltipWrapper>
            <TooltipTrigger asChild>{props.children}</TooltipTrigger>
            <TooltipContent>{props.content}</TooltipContent>
         </TooltipWrapper>
      </TooltipProvider>
   )
}

export default Tooltip
