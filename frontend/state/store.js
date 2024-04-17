import { configureStore } from '@reduxjs/toolkit'
import { pizzasApi } from './pizzasApi'

// const exampleReducer = (state = { count: 0 }) => {
//   return state
// }

export const store = () => configureStore({
  reducer: {
    // example: exampleReducer,
    [pizzasApi.reducerPath]: pizzasApi.reducer,
    // add your reducer(s) here
  },
  middleware: getDefault => getDefault().concat(
    pizzasApi.middleware,
    // if using RTK Query for your networking: add your middleware here
    // if using Redux Thunk for your networking: you can ignore this
  ),
})

// export const store = resetStore()
