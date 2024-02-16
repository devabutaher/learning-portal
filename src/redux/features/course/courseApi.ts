import apiSlice from "@/redux/api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
    }),
  }),
});

export const { useGetCoursesQuery } = courseApi;
