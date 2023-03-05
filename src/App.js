import {createTheme, ThemeProvider} from "@mui/material/styles";
import { green, indigo } from "@mui/material/colors";

import PathFinder from "./components/path-finder";
import Navbar from "./components/navbar";

const theme = createTheme({
  palette: {
    primary: indigo, 
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
