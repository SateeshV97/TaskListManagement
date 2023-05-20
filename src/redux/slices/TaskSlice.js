import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jokesData: [],
  isLoading: false,
  isMode: "",
  selectedDetail: {},
  taskList: [
    {
      id: 0,
      taskname: "Task 1",
      description: "Testing 1",
      startTime: "2023-05-20T23:58:20Z",
      endTime: "2023-05-20T23:58:20Z",
    },
    {
      id: 1,
      taskname: "Task 2",
      description: "Testing 3",
      startTime: "2023-05-20T23:00:20Z",
      endTime: "2023-05-20T23:58:20Z",
    },
    {
      id: 2,
      taskname: "Task 3",
      description: "Testing 3",
      startTime: "2023-05-20T16:58:20Z",
      endTime: "2023-05-20T14:58:20Z",
    },
  ],
  snackBarStatus: {
    open: false,
    severity: "",
    message: "",
  },
};

export const taskSlice = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    reset: () => initialState,
    setJokesData: (state, action) => {
      state.jokesData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsMode: (state, action) => {
      state.isMode = action.payload;
    },
    setSelectedDetail: (state, action) => {
      state.selectedDetail = action.payload;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setSnackbarStatus: (state, action) => {
      state.snackBarStatus = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setJokesData,
  setLoading,
  setIsMode,
  setSelectedDetail,
  setAuthorized,
  setTaskList,
  setSnackbarStatus,
  reset
} = taskSlice.actions;

export default taskSlice.reducer;
