import { Box } from '@/components/ui'
import EventsBoard from './components/events-board'
import Footer from './components/footer'
import Header from './components/header'

const Home: React.FunctionComponent = () => {
   return (
      <Box className='item-stretch flex min-h-screen flex-col' as='main'>
         <Header />
         <Box className='h-full flex-1'>
            <EventsBoard />
         </Box>
         <Footer />
      </Box>
   )
}

export default Home
