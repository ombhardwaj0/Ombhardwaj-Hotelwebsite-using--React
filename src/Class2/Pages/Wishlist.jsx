import { FaLocationArrow } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeFromWish } from "../Redux/Store/Slicer/WishlistSlicer"
export default function Wishlist(){
    const wishlist=useSelector((state)=>state.wishlist)
    console.log(wishlist)
    let navigate=useNavigate()
    const dispatch=useDispatch()
    return(
        <>
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto"></div>
         <h1 className="text-6xl font-bold text-center  text-gray-600 mb-10 border-b pb-4 tracking-wide">Wishlist</h1>
         {wishlist.length === 0 ? (
  <div className="flex flex-col items-center justify-center min-h-[50vh] w-full px-4 text-center mt-12">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
      Your wishlist is empty
    </h2>
    <p className="text-gray-500 max-w-sm mb-6 text-sm">
      Tap the save options while browsing properties to add your favorite hotels here.
    </p>
    <Link to="/allHotels" 
      className="inline-flex items-center justify-center px-6 py-2.5 font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors duration-200">
      Explore Hotels
    </Link>
  </div>) 
  : (
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {wishlist.map((el) => {
    })}
  </div>
)}
             <div className="max-w-7xl  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
               {
                wishlist.map((el)=>(
                    <div className="bg-white rounded-[40px] shadow-xl overflow-hidden p-5 ">
                    <img onClick={()=>{
                        navigate(`/detail/${el.id}`)
                    }}  src={el.thumbnail} alt=""  
                    className="w-full h-64 object-cover rounded-[35px] transition duration-500 hover:scale-110"/>
                    <h2 onClick={()=>{
                        navigate(`/detail/${el.id}`)
                    }}
                    className="text-3xl font-semibold text-center text-gray-600 mt-6 py-5">{el.name}</h2>
                    <div className="flex justify-between items-center mt-2 text-gray-500 text-lg gap-3">
                        <p >Price:<span className="font-medium">Rs.{el.price}</span></p>
                        <div className="flex items-center gap-2 w-28 justify-end">
                        <p className="flex items-center  text-lg"><FaLocationArrow className="text-red-500"/>{el.location}</p>
                        </div>
                    </div>
                    <button className="flex items-center mt-8 gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-xl  shadow-md text-xs font-semibold
                    px-14 py-2 rounded-lg transition-colors duration-300"
                            onClick={(e)=>{
                            e.stopPropagation();
                            dispatch(removeFromWish(el.id))}}>
                                Remove from Wishlist
                                </button>
                                </div>
                                ))
                                }
                    </div>
              </div>
          </>
    )
}