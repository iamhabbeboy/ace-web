import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createExam, fetchExam } from "../../thunks/exam";
import { IExam, IQuestion } from "../../../types/Type";

export interface ExamState {
  data: IExam[];
  error?: string;
  isLoading?: boolean;
}

export type UpdateExamPayload = Pick<IExam, "id"> & {
  name?: string;
  description?: string;
  questions?: IQuestion[];
  subject_slugs?: string[];
};

export const initialState: ExamState = {
  data: [],
  isLoading: false,
  error: "",
};

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    updateExamObj(state: ExamState, action: PayloadAction<UpdateExamPayload>) {
      if (action.payload.questions) {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        const exams = state.data[index].questions || [];
        state.data[index].questions = [...exams, ...action.payload.questions];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createExam.pending, (state: ExamState) => {
      state.isLoading = true;
    });
    builder.addCase(createExam.rejected, (state: ExamState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(createExam.fulfilled, (state: ExamState, action) => {
      state.isLoading = false;
      state.data = state.data || [];
      state.data.push(action.payload as IExam);
    });

      builder.addCase(fetchExam.pending, (state: ExamState) => {
        state.isLoading = true;
      });
      builder.addCase(fetchExam.rejected, (state: ExamState, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(fetchExam.fulfilled, (state: ExamState, action: any) => {
        state.isLoading = false;
        state.data = [];
        state.data = action.payload;
      });
    //     // state.data[index].questions = [...state.data[index].questions, ...action.payload.questions] || [];
    //       // state.data[index].questions = [
    //       //   ...state.data[index].questions,
    //       //   action.payload.questions[0],
    //       // ];
    //   });
  },
});

export const { updateExamObj } = examSlice.actions;

export default examSlice.reducer;
