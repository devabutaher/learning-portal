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

    addAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignments`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: assignment } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                draft.push(assignment);
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, err, arg) => [
        { type: "Assignment", id: arg.id },
      ],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: assignment } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                return draft.map((item) =>
                  item.id === assignment.id ? assignment : item
                );
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    getAssignments: builder.query({
      query: () => "/assignments",
      providesTags: ["Assignments"],
    }),

    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags: (result, err, id) => [{ type: "Assignment", id }],
    }),

    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                return draft.filter((item) => item.id !== id);
              }
            )
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useAddAssignmentMarkMutation,
  useGetAssignmentByVideoQuery,
  useGetAssignmentByStudentQuery,
  useGetAssignmentMarksQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useDeleteAssignmentMutation,
} = assignmentApi;
