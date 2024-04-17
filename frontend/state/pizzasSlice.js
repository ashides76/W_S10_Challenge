import { createSlice } from '@reduxjs/toolkit'

export const pizzasSlice = createSlice({
    name: 'pizzasSlice',
    initialState: {
        pizzaSize: 'All',
    },
    reducers: {
        filterSize: (state, action) => {
            state.pizzaSize = action.payload
        } 
    }
})

export const {
    filterSize, 
} = pizzasSlice.actions

export default pizzasSlice.reducer