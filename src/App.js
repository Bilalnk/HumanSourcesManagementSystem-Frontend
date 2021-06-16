import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./layout/Dashboard";

import JobAdvertisementPage from "./pages/JobAdvertisementPage";
import AddJobAdvertisementPage from "./pages/AddJobAdvertisementPage";
import JobAdvertisementDetails from "./pages/JobAdvertisementDetails";

import 'semantic-ui-css/semantic.min.css'
import EmployersPage from "./pages/EmployersPage";

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
        <Switch>
          <Dashboard>

            <Route exact path="/">
              <JobAdvertisementPage />
            </Route>

            <Route path="/addadvertisement">
              <AddJobAdvertisementPage />
            </Route>

            <Route path="/jobDetail/:JobAdvertisementId">
              <JobAdvertisementDetails />
            </Route>

            <Route path="/employer/:employerId">
              <EmployersPage/>
            </Route>
          </Dashboard>
        </Switch>
      </Router>
    </ThemeProvider>

// <ThemeProvider theme={theme}>
//       <Router>
//         <Switch>

//           <Route path="/error">
//             <ErrorPage />
//           </Route>

//         </Switch>
//       </Router>
//     </ThemeProvider> 

  );
}

export default App;
