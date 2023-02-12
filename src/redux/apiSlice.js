import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    url: '/'
  }),
  endpoints: build => ({
    setRatings: build.mutation({
      query: ratings => ({
        url: '/',
        method: 'POST',
        body: ratings
      })
    })
  })
})

export const { useSetRatingsQuery } = api;