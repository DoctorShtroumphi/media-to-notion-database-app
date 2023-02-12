import { createSlice } from '@reduxjs/toolkit';

const scareFactorsSlice = createSlice({
  name: 'scareFactors',
  initialState: [],
  reducers: {
    getScareFactors(state, action) {
      return state;
    },
    setScareFactors(state, action) {
      state = action.payload
    }
  }
});

export const { getScareFactors, setScareFactors } = scareFactorsSlice.actions;
export default scareFactorsSlice.reducer;