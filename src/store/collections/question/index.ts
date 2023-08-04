import { createSlice } from "@reduxjs/toolkit";
import { IPaginatedQuestion, IQuestion } from "../../../types/Type";
import { createQuestion, getQuestion, getQuestionsWithFilter } from "../../thunks/question";

export interface QuestionState {
  data: IQuestion[];
  error?: string;
  isLoading?: boolean;
}
export interface PaginatedQuestionState {
  data: IPaginatedQuestion;
  error?: string;
  isLoading?: boolean;
}

export const initialState: QuestionState = {
  data: [],
  isLoading: false,
  error: "",
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createQuestion.pending, (state: QuestionState) => { 
        state.isLoading = true;
      });
      builder.addCase(createQuestion.rejected, (state: QuestionState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(createQuestion.fulfilled, (state: QuestionState, action) => {
        state.isLoading = false;
        state.data = state.data || [];
        state.data.push(action.payload as IQuestion);
      });
      // get student questions
      builder.addCase(getQuestionsWithFilter.pending, (state: QuestionState) => { 
        state.isLoading = true;
      });
      builder.addCase(getQuestionsWithFilter.rejected, (state: QuestionState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(getQuestionsWithFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = state.data || [];
        state.data[0] = action.payload as any;
      });
      // get questions
      builder.addCase(getQuestion.pending, (state: QuestionState) => { 
        state.isLoading = true;
      });
      builder.addCase(getQuestion.rejected, (state: QuestionState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(getQuestion.fulfilled, (state: QuestionState, action) => {
        state.isLoading = false;
        state.data = state.data || [];
        state.data.push(action.payload as IQuestion);
      });
  }
});

export default questionSlice.reducer;
