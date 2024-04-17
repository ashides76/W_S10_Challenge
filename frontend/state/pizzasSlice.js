import { createSlice } from '@reduxjs/toolkit'

export const pizzasSlice = createSlice({
    name: 'pizzasSlice',
    initialState: {
        pizzaSize: '',
    },
    reducers: {
        filterSize: (state, action) => {
            const size = action.payload
            state.pizzaSize = size
        } 
    }
})

export const {
    filterSize, 
} = pizzasSlice.actions

export default pizzasSlice.reducer