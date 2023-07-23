import { createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../../types/Type";
import { createQuestion, getQuestion } from "../../thunks/question";

export interface QuestionState {
  data: IQuestion[];
  error?: string;
  isLoading?: boolean;
}

//   export type UpdateExamPayload = Pick<IExam, "id"> & {
//     name?: string;
//     description?: string;
//     questions?: IQuestion[];
//     subject_slugs?: string[];
//   };

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
        state.data.concat(action.payload);
      });
  }
});

export default questionSlice.reducer;
