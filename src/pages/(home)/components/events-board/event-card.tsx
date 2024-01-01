import { EventType } from '@/common/types/entities'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, Icon, Image } from '@/components/ui'
import { Link } from 'react-router-dom'

type EventCardProps = {
   data: EventType
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
   return (
      <Card className='w-[288px] overflow-clip transition-transform duration-200 ease-in-out hover:-translate-y-2 hover:shadow-lg'>
         <CardHeader className='h-52 space-y-0 p-2'>
            <Image src={data?.banner} height={208} width='100%' className='aspect-[16/9] h-full max-w-full rounded-lg object-cover' />
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
            <CardDescription className='mb-1 line-clamp-3 min-h-[64px]'>{data?.description}</CardDescription>
            <CardDescription className='mb-2 inline-flex items-center space-x-2'>
               <Icon name='User' />
               <span>{data?.user?.name}</span>
            </CardDescription>
         </CardContent>
         <CardFooter className='mt-2 justify-center px-3'>
            <Button asChild size='sm' variant='default' className='w-full'>
               <Link to={`/${data.id}`}>Chi tiết</Link>
            </Button>
         </CardFooter>
      </Card>
   )
}

export default EventCard
