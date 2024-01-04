import { FeedbackType } from '@/common/types/entities'
import { Box, Button, Icon } from '@/components/ui'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as qs from 'qs'

const FeedbackListPagination: React.FC<Pick<Pagination<FeedbackType>, 'hasNextPage' | 'hasPrevPage' | 'totalPages' | 'totalDocs'>> = (props) => {
   const [params] = useSearchParams()
   const navigate = useNavigate()
   const currentPage = params.get('page') ? Number(params.get('page')) : 1
   return (
      <Box className='flex items-center gap-x-4 text-xs'>
         {currentPage}/{props.totalPages ?? 1} trong tổng số {new Intl.NumberFormat().format(props.totalDocs || 0)}
         <Box>
            <Button variant='ghost' size='icon' disabled={!props.hasPrevPage} onClick={() => navigate({ search: qs.stringify({ page: currentPage - 1 }) })}>
               <Icon name='ChevronLeft' />
            </Button>
            <Button variant='ghost' size='icon' disabled={!props.hasNextPage} onClick={() => navigate({ search: qs.stringify({ page: currentPage + 1 }) })}>
               <Icon name='ChevronRight' />
            </Button>
         </Box>
      </Box>
   )
}

export default FeedbackListPagination
