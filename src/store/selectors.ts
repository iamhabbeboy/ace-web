import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { IExam, IUser } from "../types/Type";

export const selectUser = (state: RootState): IUser => state.account.user.data;

export const selectSubject = createSelector(
  [selectUser],
  (user: IUser): string[] => user.subject_slugs || []
);

export const selectCustomSubject = createSelector(
  [selectSubject],
  (subjects: string[]): any => {
    return subjects.map((subject: string) => {
      return { label: subject, value: subject };
    });
  }
);

export const selectExam = (state: RootState): IExam[] => state.account.exam.data;

export const selectExamById = createSelector(
  [selectExam],
  (exams): IExam[] => {
    return exams.map((exam: IExam) => exam);
  }
);