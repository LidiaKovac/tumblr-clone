import { createSlice } from "@reduxjs/toolkit";

export interface PostCreatorState {
  isOpen: boolean
}

const initialState: PostCreatorState = {
  isOpen: false
};

export const postCreatorSlice = createSlice({
  name: "postCreator",
  initialState,
  reducers: {
    setIsOpen: (state, {payload}) => {
        return {
            ...state,
            isOpen: payload
        }
    },
    
  },
});

// Action creators are generated for each case reducer function
// export const {  } = postSlice.actions
export const { setIsOpen } = postCreatorSlice.actions;
export default postCreatorSlice.reducer;
