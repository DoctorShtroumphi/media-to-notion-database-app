import { createSlice } from '@reduxjs/toolkit';

const scareFactorsSlice = createSlice({
  name: 'scareFactors',
  initialState: { value: [] },
  reducers: {
    getScareFactors(state) {
      return state.value;
    },
    setScareFactors(state, action) {
      state.value = action.payload;
    }
  }
});

export const { getScareFactors, setScareFactors } = scareFactorsSlice.actions;
export default scareFactorsSlice.reducer;