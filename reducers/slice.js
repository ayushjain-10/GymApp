// slice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exercises: {},
  tracked: {},
  routine: {},
};

const slice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    addExercise: (state, action) => {
      state.exercises[action.payload.category] = action.payload;
    },
    trackExercise: (state, action) => {
      state.tracked[action.payload.exercise] = action.payload;
    },
    addToRoutine: (state, action) => {
      state.routine[action.payload.day] = action.payload.category;
    },
  },
});

export const { addExercise, trackExercise, addToRoutine } = slice.actions;
export default slice.reducer;
