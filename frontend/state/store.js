import { configureStore } from '@reduxjs/toolkit'
import { pizzasApi } from './pizzasApi'
import pizzasSlice from './pizzasSlice'

export const resetStore = () => configureStore({
  reducer: {
    pizzasSlice: pizzasSlice,
    [pizzasApi.reducerPath]: pizzasApi.reducer,
  },
  middleware: getDefault => getDefault().concat(
    pizzasApi.middleware,
  ),
})
export const store = resetStore()