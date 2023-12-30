import { EventType } from '@/common/types/entities'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, Icon, Image } from '@/components/ui'
import { Link } from 'react-router-dom'

type EventCardProps = {
   data: EventType
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
   return (
      <Card className='max-w-[288px] overflow-clip transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg'>
         <CardHeader className='flex h-52 items-center justify-center bg-secondary p-0 text-muted-foreground/50'>
            <Image src={data?.banner} height={208} width='100%' className='aspect-[16/9] max-w-full object-cover' />
         </CardHeader>
         <CardContent className='flex flex-col gap-y-2 px-3 py-2'>
            <Link className='line-clamp-1 font-medium' to='#'>
               {data?.name}
            </Link>
            <CardDescription className='mb-2 inline-flex items-center space-x-2'>
               <Icon name='Calendar' />
               <time>
                  {data?.start_time?.toString()} - {data?.end_time?.toString()}
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

export default EventCard
