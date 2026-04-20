import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    hcp_name: "",
    interaction_type: "",
    topics: "",
    sentiment: "",
  },
  reducers: {
    updateFields: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFields } = interactionSlice.actions;
export default interactionSlice.reducer;