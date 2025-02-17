
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from "./initialState";

const sendSongs = createSlice({
    name: "firstNine",
    initialState,
    reducers: {
        firstNine: (initialState) => {
          let select = initialState.slice(0,9)
          return select;
          
        },
     
}});

export const {firstNine, secondNine} = sendSongs.actions;
export default sendSongs.reducer;