// slice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exercises: {
    Biceps: [],
    Triceps: [],
    Legs: [],
    Back: [],
    Chest: [],
    Shoulders: [],
    Abs: [],
  },
  tracked: {},
  routine: {},
};

const slice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    addExercise: (state, action) => {
      if (!state.exercises[action.payload.category]) {
        state.exercises[action.payload.category] = [];
      }
      state.exercises[action.payload.category].push(action.payload);
    },
    trackExercise: (state, action) => {
      state.tracked[action.payload.exercise] = action.payload;
    },
    addToRoutine: (state, action) => {
      if (!state.routine[action.payload.day]) {
        state.routine[action.payload.day] = [];
      }
      state.routine[action.payload.day].push(action.payload.exercise);
    },
    addToTracked: (state, action) => {
      state.tracked[action.payload.exerciseData.exercise] = {
        sets: action.payload.exerciseData.sets,
        reps: action.payload.exerciseData.reps,
        done: false,
      };
    },
  },
});

export const { addExercise, trackExercise, addToRoutine, addToTracked } = slice.actions;
export default slice.reducer;
