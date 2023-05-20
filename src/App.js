import React from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { theme } from "./styles/theme";
import { ThemeProvider } from "@mui/material";
import store from "./redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
