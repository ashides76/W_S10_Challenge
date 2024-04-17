import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzasApi = createApi({
    reducerPath: 'pizzasApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:9009/api/'}),
    tagTypes: ['Pizzas'],
    endpoints: build => ({

        getPizzaOrders: build.query({
            query: () => 'pizza/history',
            providesTags: ['Pizzas']
        }),
       
    })
})