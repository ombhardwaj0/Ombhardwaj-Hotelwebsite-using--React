import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
export default function Home(){
    const {id}=useParams()
    const [hotel,setHotel]=useState(null);
    useEffect(()=>{
        fetch("https://demohotelsapi.pythonanywhere.com/hotels")
        .then((res)=>res.json())
        .then((result)=>{
            const selectHotel=result.data.find(
                item=>item.id===Number(id)
            )
            setHotel(selectHotel);
        })
    },[id]);
    if (!hotel){
        return <h2>Loading.....</h2>
    }
    return(
    <div className="max-w-6xl mx-auto  px-6 py-10">
          <div className="text-center mb-10">
            < h2 className="text-10xl font-bold text-gray-800 text-center my-6">
            Product Details</h2>
            <div  className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
      <div className="overflow-hidden rounded-3xl shadow-2xl">
      <img src={hotel.thumbnail} alt={hotel.name}
        className="w-full h-[500px] object-cover hover:scale-105 duration-500 rounded-lg"/>
      <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mt-6">
        {hotel.name}
      </h1>
       <div className="flex items-center justify-center space-x-1 text-gray-500 ">
      <span className="text-red-500   text-xl">📍</span>
      <p className="text-gray-500 text-xl font-medium ">
        {hotel.location}
      </p>
      </div>
      <div className="mt-6">
        <span className="text-sm font-bold text-gray-500">
            Starting From
        </span>
      <p className="text-2xl text-blue-600 font-semibold mt-3">
        ₹{hotel.price}
      </p>
      <p className="text-green-600 font-medium">Icludes Taxes & Fees</p></div>
      <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-3">
        About this Hotel
      </h3>
      <p className="mt-4 text-gray-700">
        {hotel.description}
      </p>
       </div>
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">
        Amenities
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-100 p-4 rounded-xl text-center">
          📶 Free WiFi
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center">
          🍽️ Restaurant
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center">
          🏊 Swimming Pool
        </div>
           <div className="bg-gray-100 p-4 rounded-xl text-center">
          🚗 Free Parking
          </div>
          </div>
    </div>
    </div>
    </div>
</div>
);
}    
