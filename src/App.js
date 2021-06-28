import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css' 

import Login from "./pages/Login";
import AddJobAd from "./pages/AddJobAd";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./layout/Dashboard";
import Employers from "./pages/EmployersPage";
import CandidatesPage from "./pages/CandidatesPage";
import ConfirmJobAdvPage from "./pages/ConfirmJobAdvPage";
import EmployerDetailPage from "./pages/EmployerDetailPage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import JobAdvertisementPage from "./pages/JobAdvertisementPage";
import JobAdvertisementDetails from "./pages/JobAdvertisementDetails";

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

          <Route exact path="/">
            <Dashboard>
                <JobAdvertisementPage />
            </Dashboard>
          </Route>

          <Route path="/addadvertisement">
            <Dashboard>
                <AddJobAd />
            </Dashboard>
          </Route>

          <Route path="/jobDetail/:JobAdvertisementId">
            <Dashboard>
                <JobAdvertisementDetails />
            </Dashboard>
          </Route>

          <Route path="/employer/:employerId">
            <Dashboard>
                <EmployerDetailPage />
            </Dashboard>
          </Route>

          <Route path="/employers">
            <Dashboard>
                <Employers />
            </Dashboard>
          </Route>

          <Route path="/candidates">
            <Dashboard>
                <CandidatesPage />
            </Dashboard>
          </Route>

          <Route path="/candidate/:candidateId">
            <Dashboard>
                <CandidateDetailPage />
            </Dashboard>
          </Route>

          <Route path="/disconfirmedadvertisements">
            <Dashboard>
                <ConfirmJobAdvPage/>
            </Dashboard>
          </Route>

          <Route path="/login">
                <Login/>
          </Route>
        
          <Route component={ErrorPage} />


        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;
