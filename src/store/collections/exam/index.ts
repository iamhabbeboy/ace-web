import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../thunks/user";
import { IExam } from "../../../types/Type";

export interface ExamState {
  data: IExam;
  error?: string;
  isLoading?: boolean;
}

export const initialState: ExamState = {
  data: {
    id: "000000000000000000000",
    name: "",
    description: "",
    student_count: "0",
    created_at: new Date().toUTCString(),
    updated_at: new Date().toUTCString(),
    expired_at: new Date().toUTCString(),
    student_login_uri: "",
    created_by: "",
    user_id: "",
    subjects: [{
      name: "English",
      slug: "english",
      description: "",
    }],
    questions: [
          {
            content: "",
            content_html: "",
            answer: "",
            options: [],
          },
        ],
  },
  isLoading: false,
  error: "",
};

export const examSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state: ExamState) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.rejected, (state: ExamState, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(
      getUser.fulfilled,
      (state: ExamState, action: PayloadAction<{}>) => {
        state.isLoading = false;
        // state.data = action.payload;
      }
    );
  },
});

export default examSlice.reducer;
