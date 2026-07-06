 import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToWish, removeFromWish } from '../Redux/Store/Slicer/WishlistSlicer.jsx'
export default function HomePage() {
  const dispatch = useDispatch()
  const {products,setProduct} = useState([]);
  const {status,setStatus} = useState('idle')
  const wishlistItems = useSelector(state => state.wishlist.items);
 useEffect(() => {
    if (status === 'idle') {
      setStatus('Loading');
    fetch(`https://demohotelsapi.pythonanywhere.com/hotels`)
      .then(res=>res.json())
      .then(data=>{
        if (data &&Array.isArray(data,data)){
          setProduct(data.data);
        }
        setStatus('Succeeded');
      })
      .catch(()=>setStatus('Failed'));
    }
  },[ status])
  const isWishlisted = id => wishlistItems.some(item => item.id === id)
  const toggleWishlist = hotel => {
    if (isWishlisted(hotel.id)) {
      dispatch(removeFromWish(hotel.id))
    } else {
      dispatch(addToWish(hotel))
    }
  }
return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-950 via-indigo-900 to-indigo-600 px-6 py-10 text-white shadow-2xl shadow-slate-400/20">
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute left-8 top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-200">
            Best hotel match
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Book the perfect stay, save the best hotels.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200/90">
            Discover top-rated hotels, compare options, and keep your favourites ready in a clean wishlist experience that helps you travel with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/search"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/10 transition hover:scale-[1.01] hover:bg-slate-100">
              Search hotels
            </Link>
            <Link
              to="/wishlist"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              View wishlist
            </Link>
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Quick picks</p>
            <p className="mt-3 text-3xl font-semibold text-white">6+</p>
            <p className="mt-2 text-sm text-slate-300">Top hotels selected for you.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Easy wishlist</p>
            <p className="mt-3 text-3xl font-semibold text-white">Save & compare</p>
            <p className="mt-2 text-sm text-slate-300">Keep your favourite stays in one place.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-300">Smart choices</p>
            <p className="mt-3 text-3xl font-semibold text-white">Trusted picks</p>
            <p className="mt-2 text-sm text-slate-300">Designed for quick hotel decisions.</p>
          </div>
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Top hotel picks</h2>
            <p className="text-sm text-slate-500">Browse the latest hotel list and save what fits your travel plan.</p>
          </div>
          <Link to="/allHotels" className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            Explore all hotels →
          </Link>
        </div>
        {status === 'loading' && <p className="text-slate-600">Loading hotel list…</p>}
        {status === 'failed' && <p className="text-red-600">Unable to load hotels. Please refresh.</p>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(products) && products.slice(0, 6).map(hotel => (
            <article
              key={hotel.id}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <img src={hotel.thumbnail} alt={hotel.name} className="h-44 w-full rounded-[24px] object-cover" />
              <div className="mt-4 space-y-3 text-left">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
                    <p className="text-sm text-slate-500">{hotel.location}</p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {hotel.rating.toFixed(1)}⭐
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{hotel.description}</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/details/${hotel.id}`}
                    className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(hotel)}
                    className={
                      'rounded-full px-4 py-2 text-sm font-semibold transition ' +
                      (isWishlisted(hotel.id)
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200')
                    }>
                    {isWishlisted(hotel.id) ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            </article>
          ))}
           </div>
      </section>
<section className="mt-16 bg-white rounded-2xl border border-slate-100 p-6 md:p-10 shadow-sm text-black">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div className="space-y-4 order-2 md:order-1">
      <span className="text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
        Premium Experience
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
        Find Your Next Escape with Absolute Comfort
      </h2>
      <p className="text-slate-600 leading-relaxed text-sm md:text-base">
        We connect travelers with verified premium hotels offering exceptional amenities, pristine locations, and unmatched hospitality. Filter through our tailored selection to match your exact trip goals seamlessly.
      </p>
      <div className="pt-2">
        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">✓</span>
          24/7 Priority Support Desk
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-700 font-medium mt-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">✓</span>
          Flexible Cancellation Packages
        </div>
      </div>
    </div>
    <div className="order-1 md:order-2">
      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" 
        alt="Luxury hotel room experience" 
        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md border border-slate-200"/>
    </div>
        </div>
        </section>
         <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 p-6 text-white shadow-xl relative border border-slate-800/60">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />
               <div className="absolute bottom-0 left-1/3 h-24 w-48 rounded-full bg-emerald-500/5 blur-2xl" />
               <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80 text-center sm:text-left">
    <div className="flex flex-col items-center sm:items-start sm:px-6 first:pl-0 gap-3 group cursor-pointer">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-indigo-400 border border-slate-700/50 shadow-inner group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72.5.5 0 00.57.45l3.57-.36a1 1 0 011.07.72L16.42 8a1 1 0 01-.36 1.07l-2.07 1.38a1 1 0 00-.45.86v2.89a1 1 0 00.45.86l2.07 1.38a1 1 0 01.36 1.07l-.76 2.76a1 1 0 01-1.07.72l-3.57-.36a.5.5 0 00-.57.45l-.72 3.28a1 1 0 01-.94.72H5a2 2 0 01-2-2V5z" />
        </svg>
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Call Concierge</p>
        <p className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors duration-200">+1 (800) 555-LUXY</p>
      </div>
    </div>
    <div className="flex flex-col items-center sm:items-start pt-6 sm:pt-0 sm:px-6 gap-3 group cursor-pointer">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 shadow-inner group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Email Support</p>
        <p className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors duration-200">escapes@absolutecomfort.com</p>
      </div>
    </div>
    <div className="flex flex-col items-center sm:items-start pt-6 sm:pt-0 sm:px-6 last:pr-0 gap-3 group">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-rose-400 border border-slate-700/50 shadow-inner group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Headquarters</p>
        <p className="text-sm font-semibold text-slate-200 group-hover:text-rose-400 transition-colors duration-200">Vrindavan, India</p>
      </div>
    </div>
    </div>
</div>
    </div>
     )
}