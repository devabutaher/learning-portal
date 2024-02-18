import apiSlice from "../../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["Videos"],
    }),

    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, err, id) => [{ type: "Video", id }],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: `/videos`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              draft.push(video);
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, err, arg) => [{ type: "Video", id: arg.id }],

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: video } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              return draft.map((item) => (item.id === video.id ? video : item));
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
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
  useGetVideosQuery,
  useGetVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
