import { createSlice } from "@reduxjs/toolkit";
import { createExam } from "../../thunks/exam";
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
  name: "user",
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
    builder.addCase(
      createExam.fulfilled,
      (state: ExamState, action) => {
        state.isLoading = false;
        state.data.push(action.payload as IExam);
      }
    );
  },
});

export default examSlice.reducer;
