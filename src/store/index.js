import { configureStore } from "@reduxjs/toolkit";
import { PredictionSlice } from "./slices/PredictionSlice";

const store = configureStore({
  reducer: {
    predictions: PredictionSlice.reducer,
  },
});

export default store;
