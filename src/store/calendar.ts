import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getDays } from "../util/calendar";

const initalState = {
  // 선택날짜
  date: dayjs().format("YYYY-MM-DD"),
  now: dayjs().format("YYYY-MM-DD"),
  days: getDays(dayjs().format("YYYY-MM-DD"))
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initalState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      const selectedDate = dayjs(action.payload).format("YYYY-MM-DD");
      state.date = selectedDate;
      state.days = getDays(selectedDate);
    },
  },
});

export const { setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
