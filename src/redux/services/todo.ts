import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TodoApi = createApi({
  reducerPath: "TodoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
    prepareHeaders: (headers) => {
      //   const auth = getAuth();
      //   onAuthStateChanged(auth, (user: any) => {
      // if (user) {
      //   headers.set("Authorization", `Bearer ${user.accessToken}`);
      headers.set("Content-Type", "application/json");
      // }
      //   });
      return headers;
    },
  }),

  tagTypes: ["TODO"],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TODO"],
    }),
    signUp: builder.mutation({
      query: (payload) => ({
        url: "/users/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["TODO"],
    }),
    getPassengers: builder.query<void, void>({
      query: () => `/passenger`,
      // transformResponse: (data: { data: Analytics }) => data.data,
      providesTags: ["TODO"],
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = TodoApi;
