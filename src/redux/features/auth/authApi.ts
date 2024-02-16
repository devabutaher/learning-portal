import apiSlice from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn(result.data.user));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn(result.data.user));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
