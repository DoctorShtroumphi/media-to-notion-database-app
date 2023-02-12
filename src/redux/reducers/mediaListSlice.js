import { createSlice } from '@reduxjs/toolkit';

const mediaListSlice = createSlice({
  name: 'mediaList',
  initialState: [],
  reducers: {
    setMediaList(state, action) {
      state = action.payload
    }
  }
});

export const { setMediaList } = mediaListSlice.actions;
export default mediaListSlice.reducer;

/*
const initialState = {
  mediaList: [],
  ratings: [],
  scareFactors: []
}

function MediaReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MEDIA_LIST":
      return Object.assign({}, state, {
        mediaList: action.value
      });
    case "SET_RATINGS":
      return Object.assign({}, state, {
        ratings: action.value
      });
    case "SET_SCARE_FACTORS":
      return Object.assign({}, state, {
        scareFactors: action.value
      });
    default:
      return state;
  }
}*/