import { Tooltip as TooltipWrapper, TooltipContent, TooltipProvider, TooltipTrigger } from '..'

type TooltipProps = { content: string; dir?: 'top'; asChild?: boolean } & React.PropsWithChildren

const Tooltip: React.FC<TooltipProps> = (props) => {
   return (
      <TooltipProvider delayDuration={0}>
         <TooltipWrapper>
            <TooltipTrigger asChild={props.asChild} type='button'>
               {props.children}
            </TooltipTrigger>
            <TooltipContent dir=''>{props.content}</TooltipContent>
         </TooltipWrapper>
      </TooltipProvider>
   )
}

export default Tooltip
