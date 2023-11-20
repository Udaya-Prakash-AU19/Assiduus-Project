import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

export default function AppContainer() {
  const theme = createTheme({
    typography: {
      h6: {
        fontSize: 16,
        fontWeight: 700,
        color: grey[800],
        letterSpacing: -1,
      },
      fontFamily: "'Nunito', sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: 10,
      },
    },
    palette: {
      secondary: {
        main: grey[800],
      },
      info: {
        main: grey[500],
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            {/* As all menu items need to render same component / page, all routes are made to render same component */}
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/accounts" element={<Dashboard />}></Route>
            <Route path="/payroll" element={<Dashboard />}></Route>
            <Route path="/reports" element={<Dashboard />}></Route>
            <Route path="/advisor" element={<Dashboard />}></Route>
            <Route path="/contacts" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
