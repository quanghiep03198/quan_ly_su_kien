import { Badge, Box, DropdownSelect, Icon, Input, Typography } from '@/components/ui'
import { debounce } from 'lodash'
import { toast } from 'sonner'

type SearchBoxProps = {
   onSearchValueChange: React.Dispatch<React.SetStateAction<string>>
   onSortChange: React.Dispatch<React.SetStateAction<string>>
}

const locationOptions: Record<'label' | 'value', string>[] = [
   { label: 'Hà Nội', value: 'Hà Nội' },
   { label: 'Hải Phòng', value: 'Hải Phòng' },
   { label: 'Thái Nguyên', value: 'Thái Nguyên' },
   { label: 'Hà Nam', value: 'Hà Nam' },
   { label: 'Thanh Hoá', value: 'Thanh Hoá' },
   { label: 'Quy Nhơn', value: 'Quy Nhơn' },
   { label: 'Đà Nẵng', value: 'Đà Nẵng' },
   { label: 'Tây Nguyên', value: 'Tây Nguyên' },
   { label: 'Đồng Nai', value: 'Đồng Nai' },
   { label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
   { label: 'Cần Thơ', value: 'Cần Thơ' }
]

const postedTimeOptions: Record<'label' | 'value', string>[] = [
   { label: 'Mới nhất', value: 'latest' },
   { label: 'Cũ nhất', value: 'oldest' }
]

const keywords = ['Happy Bee', 'Hackathon', 'Poly Microsoft Office', 'Poly Running']

const SearchBox: React.FC<SearchBoxProps> = ({ onSearchValueChange, onSortChange }) => {
   const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => onSearchValueChange(e.target.value), 500)

   return (
      <Box className='space-y-6'>
         <Box className='grid grid-cols-4 gap-4'>
            <Box className='relative sm:col-span-4'>
               <Input className='pl-8' placeholder='Tên sự kiện ...' onChange={handleSearch} />
               <Icon name='Search' className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground/50' />
            </Box>
            <DropdownSelect
               className='sm:col-span-2'
               options={locationOptions}
               placeholder='Địa điểm'
               onChange={() => {
                  toast.info('Chức năng hiện đang được cập nhật')
               }}
            />
            <DropdownSelect
               className='sm:col-span-2'
               options={postedTimeOptions}
               placeholder='Ngày đăng'
               onChange={(value) => {
                  onSortChange(value as string)
               }}
            />
         </Box>
         <Box className='flex items-center gap-4 sm:flex-col sm:items-start md:flex-col md:items-start'>
            <Typography variant='heading6' className='text-base'>
               Đề xuất cho bạn
            </Typography>
            <Box className='space-x-1'>
               {keywords.map((item) => (
                  <Badge variant='secondary' key={item} className='cursor-pointer'>
                     {item}
                  </Badge>
               ))}
            </Box>
         </Box>
      </Box>
   )
}

export default SearchBox
