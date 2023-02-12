import { createSlice } from '@reduxjs/toolkit';

const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: { value: { ratings: [] } },
  reducers: {
    getRatings: (state) => {
      return state.value;
    },
    setRatings: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { getRatings, setRatings } = ratingsSlice.actions;
export default ratingsSlice.reducer;