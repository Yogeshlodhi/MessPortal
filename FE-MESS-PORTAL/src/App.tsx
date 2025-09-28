import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/routes";
import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./muiTheme";
import "./assets/scss/index.scss";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
