import apiSlice from "../../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      invalidatesTags: (result, error, data) => [
        ["AssignmentMarks"],
        { type: "StudentAssignment", id: data.student_id },
      ],
    }),

    getAssignmentByVideo: builder.query({
      query: (id) => `/assignments?video_id=${id}`,
    }),

    getAssignmentByStudent: builder.query({
      query: ({ student_id, assignment_id }) =>
        `/assignmentMark?student_id=${student_id}&assignment_id=${assignment_id}`,

      providesTags: (result, error, arg) => [
        { type: "StudentAssignment", id: arg.student_id },
      ],
    }),

    getAssignmentMarks: builder.query({
      query: () => `/assignmentMark`,

      providesTags: ["AssignmentMarks"],
    }),
  }),
});

export const {
  useAddAssignmentMarkMutation,
  useGetAssignmentByVideoQuery,
  useGetAssignmentByStudentQuery,
  useGetAssignmentMarksQuery,
} = assignmentApi;
