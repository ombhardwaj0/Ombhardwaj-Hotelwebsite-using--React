import { useState, useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addToWish } from "./Redux/Store/Slicer/WishlistSlicer";
import {Link} from 'react-router-dom';
export function ProductsListings(){
    let [current,setCurrent]=useState(0);
    let [totalCount,setTotalCount]=useState(0)
    let PAGE_SIZE=33;
    let url=`https://demohotelsapi.pythonanywhere.com/hotels?limit=${PAGE_SIZE}&skip=${PAGE_SIZE*current}`
    let [data,setData]=useState([]);
    async function dataFetch(){
        let res=await fetch(url)
        let hotelsData=await res.json()
        // console.log(hotelsData.count)
        setTotalCount(hotelsData.count)
        setData(hotelsData.data);
    }
    useEffect(()=>{
        dataFetch()
    },[current])
    console.log(data);
    console.log(totalCount)
    let no_of_pages=Math.ceil(totalCount/PAGE_SIZE)
    console.log(no_of_pages)
    let start=current*PAGE_SIZE;
    let end=start+PAGE_SIZE
    return(
        <>
            <div style={{display:"flex",flexDirection:"column",gap:"30px"}}>
                {
                    data.map((el)=>(
                        <Product all={el} id={el.id} name={el.name} thumbnail={el.thumbnail} des={el.description} location={el.location} rating={el.rating} price={el.price}/>
                    ))
                }
            </div>
              <div
                className="flex justify-center items-center gap-3 mt-10 mb-8" >
                <button
                    onClick={() => setCurrent((prev) => prev - 1)}
                    disabled={current === 0}
                    className="px-4 py-2 rounded-lg bg-gray-600 text-gray-700 hover:text-white transition duration-300">
                    Previous
                </button>
                 {/* First Page -- yaha per fix karne ke liye*/}
                <button
                    onClick={() => setCurrent(0)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md">
                    1
                </button>
                 {/* Left Dots */}
                {current > 2 && <span className=" text-gray-500 font-bold">...</span>}
                {current > 1 && (
                    <button  className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md"
                    onClick={() => setCurrent(current - 1)}>
                        {current}
                    </button>
                )}
                {current !== 0 && current !== no_of_pages - 1 && (
                    <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md">
                        {current + 1}
                    </button>
                )}
                 {current < no_of_pages - 2 && (
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md"
                       onClick={() => setCurrent(current + 1)}>
                        {current + 2}
                    </button>
                )}
                {/* Right Dots */}
                {current < no_of_pages - 3 && <span className=" text-gray-500 font-bold">...</span>}
                {/* Last Page-fived karne ke liye */}
                {no_of_pages > 1 && (
                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md"
                    onClick={() => setCurrent(no_of_pages - 1)}
                        style={{
                            backgroundColor:
                                current === no_of_pages - 1
                                    ? "blue"
                                    : "white",
                            color:
                                current === no_of_pages - 1
                                    ? "white"
                                    : "black",
                        }}>
                        {no_of_pages}
                    </button>
                )}
                 <button
                    onClick={() => setCurrent((prev) => prev + 1)}
                    disabled={current === no_of_pages - 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-blue-500 hober:text-white transition duration-300">
                    Next
                </button>
            </div>
        </>
    );
}

export function Product({all,id,name,thumbnail,des,location,rating,price}){
 const navigate=useNavigate()
 let dispatch= useDispatch()
  function toDetail(id){
    navigate(`/detail/${id}`)
  }
    return(
        <div className="flex gap-5 border-2 border-gray-300 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <div  onClick={()=>{toDetail(id)}} className="overflow-hidden rounded-2xl">
                <img width="300px" height="250px"   src={thumbnail} alt="" className="w-[300px] h-[250px] rounded-xl object-cover 
                cursor-pointer"/>
            </div>
            <div className="flex flex-col gap-5 text-left flex-1">
                <h2 className="text-2xl font-bold cursor-pointer hover:text-blue-600" onClick={()=>{toDetail(id)}}>{name}</h2>
                <p className="text-gray-500" onClick={()=>{toDetail(id)}}>{des.slice(0,200)}...</p>
                <div className="flex justify-between text-gray-700">
                    <p>Location : {location}</p>
                    <p className="flex text-gray-400 text-xl"><StarRating rating={rating}/></p>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-green-600">
                    <p>Price :{price}</p> 
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
                    onClick={()=>{
                        dispatch(addToWish(all))
                        navigate("/wishlist")
                    }}
                    >Move to WishList</button>
                </div>
                </div>
                </div>
 )
}


function StarRating({rating}){
    let stars=[];
    for(let i=1;i<=Math.ceil(rating);i++){
        stars.push(<IoStarSharp color="gold"/>)
    }
     return stars;
}

export function SearchHotel() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [localSearch,setLocalSearch]=useState(location.state?.location || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(''); //sorting le liye used hoga
  const searchQuery = localSearch; 
  console.log("search query",searchQuery);
  // Data fetch karega API se
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://demohotelsapi.pythonanywhere.com/hotels?location=${searchQuery}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hotels from the server.');
        }
        const data = await response.json();
        console.log("resonse",data);
        if (data && Array.isArray(data.data)){
            setHotels(data.data)
        }else{
            setHotels([]);
        }
        console.log(data.data);
    } catch(err){
        setError(err.message);
    }finally{
        setLoading(false);
    }
    };
    fetchHotels();
},[searchQuery]);
  const getSortedHotels = () => {
    let sortedList = [...hotels];
    if (sortBy === 'price-asc') {
      sortedList.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      sortedList.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'rating-desc') {
      sortedList.sort((a, b) => Number(b.rating) - Number(a.rating));
    }
    return sortedList;
  };
  const visibleHotels = getSortedHotels().filter((hotel) => {
  const hotelLoc = hotel.location ? String(hotel.location).toLowerCase() : "";
  const searchLoc = searchQuery ? String(searchQuery).toLowerCase() : "";
  return hotelLoc.includes(searchLoc);
});
      return (
          <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
           <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔍</span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Search Hotels
            </h1>
          </div>
          <div className="my-6 max-w-md">
                    <input type="text" placeholder="Search by location (e.g., Delhi, Mumbai)..."value={localSearch}
    onChange={(e) => 
        setLocalSearch(e.target.value)}
    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"/>
           </div>

          {/* Sorting Dropdown field ke liye(filter ke basic)*/}
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">Sort By:</label>
            <select value={sortBy}
              onChange={(e) =>
                 setSortBy(e.target.value)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Default Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: Highest First</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleHotels.map((hotel) => (
            <Link to={`/detail/${hotel.id}`} key={hotel.id} 
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img src={hotel.thumbnail} alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
              </div>
               <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-md text-slate-600">
                      📍 {hotel.location}
                    </span>
                    <div className="text-amber-400 text-sm tracking-tighter">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < hotel.rating ? "text-amber-400" : "text-slate-200"}>★</span>
                      ))}
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-blue-600 line-clamp-1">
                    {hotel.name}
                  </h2>
                </div>
                 <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Per Night</span>
                    <span className="text-xl font-black text-slate-900">₹{hotel.price}</span>
                  </div>
                  <button className="bg-slate-900 text-white font-semibold text-xs px-3.5 py-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                    View Room
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}