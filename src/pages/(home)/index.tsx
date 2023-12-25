import { Box } from '@/components/ui'
import Header from './components/header'
import Footer from './components/footer'
import EventsBoard from './components/main-events-board'

const Home: React.FunctionComponent = () => {
   return (
      <Box className='item-stretch flex flex-col' as='main'>
         <Header />
         <Box>
            <EventsBoard />
         </Box>
         <Footer />
      </Box>
   )
}

export default Home
