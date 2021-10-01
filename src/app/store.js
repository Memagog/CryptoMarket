import { configureStore } from '@reduxjs/toolkit'
import coinReducer from '../redux/coinSlice'
import dataReducer from '../redux/dataSlice'

export const store = configureStore({
  reducer: {
      coin: coinReducer,
      data: dataReducer,
  },
})
store.subscribe(()=> localStorage.setItem('coinBag', JSON.stringify(store.getState().coin.coins))); 