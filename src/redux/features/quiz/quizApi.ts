import apiSlice from "../../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
    }),

    getQuizByVideo: builder.query({
      query: (id) => `/quizzes?video_id=${id}`,
    }),

    getQuizByStudent: builder.query({
      query: (id) => `/quizMark?student_id=${id}`,
    }),
  }),
});

export const {
  useAddQuizMutation,
  useGetQuizByVideoQuery,
  useGetQuizByStudentQuery,
} = quizApi;
