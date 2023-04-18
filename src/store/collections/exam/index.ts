import { createSlice } from "@reduxjs/toolkit";
import { createExam, updateExam } from "../../thunks/exam";
import { IExam } from "../../../types/Type";

export interface ExamState {
  data: IExam[];
  error?: string;
  isLoading?: boolean;
}

export const initialState: ExamState = {
  data: [],
  isLoading: false,
  error: "",
};

// {
//   id: "000000000000000000000",
//   name: "",
//   description: "",
//   student_count: "0",
//   created_at: new Date().toUTCString(),
//   updated_at: new Date().toUTCString(),
//   expired_at: new Date().toUTCString(),
//   student_login_uri: "",
//   created_by: "",
//   user_id: "",
//   subject_slugs: [],
//   questions: [
//     {
//       content: "",
//       content_html: "",
//       answer: "",
//       options: [],
//     },
//   ],
// }

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
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
      state.data.push(action.payload as IExam);
    });

    builder.addCase(updateExam.pending, (state: ExamState) => {
      state.isLoading = true;
    });
    builder.addCase(updateExam.rejected, (state: ExamState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateExam.fulfilled, (state: ExamState, action) => {
      state.isLoading = false;
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        // state.data[index].questions = [...state.data[index].questions, ...action.payload.questions] || [];
        if (Array.isArray(action.payload.questions)) {
          state.data[index].questions = [...state.data[index].questions, ...action.payload.questions];
        } else {
          state.data[index].questions = state.data[index].questions || [];
        }
        
    });
  },
});

export default examSlice.reducer;
