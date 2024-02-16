import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../redux/api/apiSlice";
import courseSlice from "../redux/features/course/courseSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    course: courseSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;
