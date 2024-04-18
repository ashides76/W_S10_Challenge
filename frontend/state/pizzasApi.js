import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzasApi = createApi({
    reducerPath: 'pizzasApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/' }),
    tagTypes: ['Pizzas'],
    endpoints: build => ({

        getPizzaOrders: build.query({
            query: () => 'history',
            providesTags: ['Pizzas']
        }),
        postNewPizzaOrder: build.mutation({
            query: orderPizza => ({
                url: 'order',
                method: 'POST',
                body: orderPizza,
            }),
            invalidatesTags:['Pizzas']
        })
    })
})

export const {
    useGetPizzaOrdersQuery, usePostNewPizzaOrderMutation,
} = pizzasApi