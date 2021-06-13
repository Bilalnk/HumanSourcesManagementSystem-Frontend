import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./layout/Dashboard";

import JobAdvertisementPage from "./pages/JobAdvertisementPage";
import AddJobAdvertisementPage from "./pages/AddJobAdvertisementPage";

const theme = createMuiTheme({
  pallette: {
    primary: {
      main: "#c1c1c1",
    },
    secondary: "#ffaa",
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: "400",
    fontWeightRegular: " 500",
    fontWeightMedium: "600",
    fontWeightBold: "700",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Dashboard>
          <Switch>
            
            <Route exact path="/">
              <JobAdvertisementPage />
            </Route>

            <Route path="/addadvertisement">
              <AddJobAdvertisementPage />
            </Route>

          </Switch>
        </Dashboard>
      </Router>
    </ThemeProvider>
  );
}

export default App;
