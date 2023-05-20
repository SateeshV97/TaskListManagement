import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import ViewTasks from "./pages/Tasks/ViewTask";
import EditTask from "./pages/Tasks/EditTask";
import CreateTask from "./pages/Tasks/EditTask";
import JokeSpt from "./pages/JokeSpot/JokeSpot";
import PrivateRoute from "./PrivateRoute";
import SnackbarAlert from "./components/Alert";
const AppRouter = () => {
  return (
    <React.Fragment>
      <SnackbarAlert />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/viewTasks"
            element={
              <PrivateRoute>
                <ViewTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/editTask"
            element={
              <PrivateRoute>
                <EditTask />
              </PrivateRoute>
            }
          />
          <Route
            path="/createTask"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />

          <Route
            path="/jokesSpot"
            element={
              <PrivateRoute>
                <JokeSpt />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppRouter;
