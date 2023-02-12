import { createSlice } from '@reduxjs/toolkit';

const mediaListSlice = createSlice({
  name: 'mediaList',
  initialState: { value: [] },
  reducers: {
    getMediaList: (state) => {
      return state.value;
    },
    setMediaList: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { getMediaList, setMediaList } = mediaListSlice.actions;
export default mediaListSlice.reducer;