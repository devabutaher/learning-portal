import apiSlice from "../../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        console.log("data:", data);
        const result = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentByStudent",
            data.student_id,
            (draft) => {
              console.log("draft:", JSON.stringify(draft));
              draft.push(data);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          result.undo();
          console.error(error);
        }
      },
    }),

    getAssignmentByVideo: builder.query({
      query: (id) => `/assignments?video_id=${id}`,
    }),

    getAssignmentByStudent: builder.query({
      query: (id) => `/assignmentMark?student_id=${id}`,
    }),
  }),
});

export const {
  useAddAssignmentMarkMutation,
  useGetAssignmentByVideoQuery,
  useGetAssignmentByStudentQuery,
} = assignmentApi;
