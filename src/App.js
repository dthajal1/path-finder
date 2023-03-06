import {createTheme, ThemeProvider} from "@mui/material/styles";
import { green, indigo } from "@mui/material/colors";

import PathFinder from "./components/path-finder";
import Navbar from "./components/navbar";
import { grey } from "@mui/material/colors";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: pink, 
    secondary: green,
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <PathFinder />
    </ThemeProvider>
  );
}

export default App;
