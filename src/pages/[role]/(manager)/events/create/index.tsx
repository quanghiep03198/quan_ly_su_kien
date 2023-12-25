// import Editor from '@/components/ui/@tiny-mce'
import { Box, Button, Card, CardContent, CardDescription, CardHeader, Input, Typography } from '@/components/ui'
import Editor from '@/components/ui/@lexical'

type Props = {}

const CreateEvent = (props: Props) => {
   return (
      <Box className='space-y-6'>
         <Box className='flex items-center justify-between'>
            <Typography variant='heading6'>Thêm sự kiện</Typography>
            <Button>Lưu</Button>
         </Box>

         <Box className='grid grid-cols-[1fr_2fr] gap-4'>
            <Card>
               <CardHeader>
                  Banner
                  <CardDescription>Tải lên ảnh</CardDescription>
               </CardHeader>
               <CardContent>
                  <Input type='file' />
               </CardContent>
            </Card>
            <Editor />
         </Box>
      </Box>
   )
}

export default CreateEvent
