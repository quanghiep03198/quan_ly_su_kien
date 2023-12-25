import { EventType } from '@/common/types/entities'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, Icon, Typography } from '@/components/ui'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

type EventCardProps = {
   data: EventType
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
   return (
      <Card className='max-w-[288px] overflow-clip transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg'>
         {
            <CardHeader className='flex h-52 items-center justify-center bg-secondary p-0 text-muted-foreground/50'>
               {/* <Image src={'https://picsum.photos/200/300'} /> */}
               <Icon name='Image' size={28} />
            </CardHeader>
         }
         <CardContent className='flex flex-col gap-y-2 px-3 py-2'>
            <Link className='line-clamp-1 font-medium' to='#'>
               {data.name}
            </Link>
            <CardDescription className='mb-2 inline-flex items-center space-x-2'>
               <Icon name='Calendar' />
               <time>
                  {format(data.start_time, 'dd/MM/yyyy')} - {format(data.end_time, 'dd/MM/yyyy')}
               </time>
            </CardDescription>
            <CardDescription className='mb-1 line-clamp-3'>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos repudiandae quaerat aperiam. Voluptate sapiente esse nobis atque, tempora numquam
               eaque, ipsa quaerat magni beatae sed debitis eum voluptas expedita tempore.
            </CardDescription>
            <CardDescription className='mb-2 inline-flex items-center space-x-2'>
               <Icon name='User' />
               <span>John Wick</span>
            </CardDescription>
         </CardContent>
         <CardFooter className='mt-2 justify-center px-3'>
            <Button asChild size='sm' variant='default' className='w-full'>
               <Link to=''>Chi tiết</Link>
            </Button>
         </CardFooter>
      </Card>
   )
}

const Image = tw.img`max-w-full aspect-[16/9] object-cover object-center`
const Time = tw.time`text-muted-foreground text-sm`
// const Description

export default EventCard
