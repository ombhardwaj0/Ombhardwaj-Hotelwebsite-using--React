import { BrowserRouter,Routes,Route }  from 'react-router-dom'
import Home from './Pages/Home'
import { ProductsListings, SearchHotel } from './second'
import Wishlist from './Pages/Wishlist'
import  Navbar from './Pages/Navbar'
import Contact from './Pages/Contact'
import HotelDetail from './Pages/HotelDetail'
import NotFound from './Pages/NotFound'
export default function Routing(){
    return(
        <>
          <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/allHotels' element={<ProductsListings />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/contact' element={<Contact />} />s
            <Route path='/detail/:id' element={<HotelDetail/>}/>
            <Route path="*" element={<NotFound/>}  />
            <Route path="/search/" element={<SearchHotel/>}   />
          </Routes>
          </BrowserRouter>

        </>
    )
}