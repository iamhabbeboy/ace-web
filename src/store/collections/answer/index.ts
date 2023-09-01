import { createSlice } from "@reduxjs/toolkit";
import { createOrUpdateAnswer } from "../../thunks/answer";
import { IAnswer } from "../../../types/Type";

export interface AnswerState {
  data: IAnswer;
  error?: string;
  isLoading?: boolean;
}

export const initialState: AnswerState = {
    data: {
        qId: "",
        opt: "",
        timestamp: 0,
        userId: "",
        examId: ""
    },
    isLoading: false,
    error: "",
  };

  export const answerSlice = createSlice({
    name: "answer",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(createOrUpdateAnswer.pending, (state: AnswerState) => {
        state.isLoading = true;
      });
      builder.addCase(createOrUpdateAnswer.rejected, (state: AnswerState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(createOrUpdateAnswer.fulfilled, (state: AnswerState, action) => {
        state.isLoading = false;
        state.data = action.payload
      });
    },
  });
  
  export default answerSlice.reducer;