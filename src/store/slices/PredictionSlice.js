import { createSlice } from "@reduxjs/toolkit";

const PredictionSlice = createSlice({
  name: "PredictionSlice",
  initialState: { predictions: [], fetchedFrom: null },
  reducers: {
    addPrediction(state, action) {
      state.predictions.push(action.payload);
    },
    setFetchedFrom(state, action) {
      state.fetchedFrom = action.payload;
    },
    resetPredictions(state, action) {
      state.predictions = [];
      state.fetchedFrom = null;
    },
  },
});

export { PredictionSlice };
export const { addPrediction, setFetchedFrom, resetPredictions } =
  PredictionSlice.actions;
