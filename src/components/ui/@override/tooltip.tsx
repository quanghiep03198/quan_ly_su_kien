import { Tooltip as TooltipWrapper, TooltipContent, TooltipProvider, TooltipTrigger } from '..'

type TooltipProps = { content: string; dir?: 'top'; asChild?: boolean; side?: 'top' | 'bottom' | 'right' | 'left' } & React.PropsWithChildren

const Tooltip: React.FC<TooltipProps> = (props) => {
   return (
      <TooltipProvider delayDuration={0}>
         <TooltipWrapper>
            <TooltipTrigger asChild={props.asChild} type='button'>
               {props.children}
            </TooltipTrigger>
            <TooltipContent side={props.side} dir=''>
               {props.content}
            </TooltipContent>
         </TooltipWrapper>
      </TooltipProvider>
   )
}

Tooltip.defaultProps = {
   side: 'top'
}

export default Tooltip
