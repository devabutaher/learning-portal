import apiSlice from "../../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["GetStudentAssignment"],
    }),

    getAssignmentByVideo: builder.query({
      query: (id) => `/assignments?video_id=${id}`,
    }),

    getAssignmentByStudent: builder.query({
      query: ({ student_id, assignment_id }) =>
        `/assignmentMark?student_id=${student_id}&assignment_id=${assignment_id}`,

      providesTags: ["GetStudentAssignment"],
    }),
  }),
});

export const {
  useAddAssignmentMarkMutation,
  useGetAssignmentByVideoQuery,
  useGetAssignmentByStudentQuery,
} = assignmentApi;
