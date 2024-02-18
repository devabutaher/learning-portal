import apiSlice from "../../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error, data) => [
        ["QuizMarks"],
        { type: "StudentQuiz", id: data.student_id },
      ],
    }),

    getQuizByVideo: builder.query({
      query: (id) => `/quizzes?video_id=${id}`,
    }),

    getQuizMarkByStudent: builder.query({
      query: ({ student_id, video_id }) =>
        `/quizMark?student_id=${student_id}&video_id=${video_id}`,

      providesTags: (result, error, arg) => [
        { type: "StudentQuiz", id: arg.student_id },
      ],
    }),

    getQuizMarks: builder.query({
      query: () => `/quizMark`,
      providesTags: ["QuizMarks"],
    }),

    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              draft.push(video);
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, err, arg) => [{ type: "Quiz", id: arg.id }],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: quiz } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              return draft.map((item) => (item.id === quiz.id ? quiz : item));
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    getQuizzes: builder.query({
      query: () => "/quizzes",
      providesTags: ["Quizzes"],
    }),

    getQuiz: builder.query({
      query: (id) => `/quizzes/${id}`,
      providesTags: (result, err, id) => [{ type: "Quiz", id }],
    }),

    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
              return draft.filter((item) => item.id !== id);
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useAddQuizMarkMutation,
  useGetQuizByVideoQuery,
  useGetQuizMarkByStudentQuery,
  useGetQuizMarksQuery,
  useGetQuizzesQuery,
  useDeleteQuizMutation,
  useAddQuizMutation,
  useGetQuizQuery,
  useEditQuizMutation,
} = quizApi;
