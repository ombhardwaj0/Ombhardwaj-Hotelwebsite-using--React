import { configureStore } from '@reduxjs/toolkit'
import WishlistSlicer from './Slicer/WishlistSlicer'
export const wishlistStore= configureStore({
  reducer: {
    wishlist:WishlistSlicer,
  },
}) 