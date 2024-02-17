import apiSlice from "../../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error, data) => [
        { type: "StudentQuiz", id: data.student_id },
      ],
    }),

    getQuizByVideo: builder.query({
      query: (id) => `/quizzes?video_id=${id}`,
    }),

    getQuizByStudent: builder.query({
      query: ({ student_id, video_id }) =>
        `/quizMark?student_id=${student_id}&video_id=${video_id}`,

      providesTags: (result, error, arg) => [
        { type: "StudentQuiz", id: arg.student_id },
      ],
    }),
  }),
});

export const {
  useAddQuizMutation,
  useGetQuizByVideoQuery,
  useGetQuizByStudentQuery,
} = quizApi;
