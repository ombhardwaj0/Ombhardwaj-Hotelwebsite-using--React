import { Link } from "react-router-dom";
import {FaHouse} from "react-icons/fa6";
import {useSelector} from  'react-redux'
import { BiColor } from "react-icons/bi";
export default function Navbar(){
     const wishlist=useSelector((state)=>state.wishlist  || []);
     const wishlistCount=wishlist.length;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex w-full h-20 items-center justify-between px-6 md:px-12">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-950">
            My<span className="text-indigo-600">Hotels</span>
          </span>
        </Link>
        <nav className="flex items-center gap-8 font-semibold text-lg text-slate-600 hover:text-indigo-600 transition-colors duration-300 ease-in-out">
          <Link to="/allHotels" className="hover:text-indigo-600 transition-colors duration-200 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300">
            Hotels
          </Link>
          <Link to="/wishlist" className="flex items-center gap-2 hover:text-indigo-600 transition-colors duration-200 group py-1">
            <span>Wishlist</span>
            <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full transition-all duration-300 ${
              wishlistCount > 0 
                ? 'bg-rose-500 text-white scale-100 animate-pulse' 
                : 'bg-slate-100 text-slate-400 scale-95'
            }`}>
              {wishlistCount}
            </span>
          </Link>
          <Link to="/contact" 
            className="ml-2 hidden sm:inline-block px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-250 transform hover:-translate-y-0.5">
            Contact Us
          </Link>
        </nav>
        </div>
    </header>
  );
}
    