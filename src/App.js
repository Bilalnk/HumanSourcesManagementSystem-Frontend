import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./layout/Dashboard";

import JobAdvertisementPage from "./pages/JobAdvertisementPage";
import AddJobAdvertisementPage from "./pages/AddJobAdvertisementPage";
import JobAdvertisementDetails from "./pages/JobAdvertisementDetails";

import 'semantic-ui-css/semantic.min.css'
import EmployerDetailPage from "./pages/EmployerDetailPage";
import Employers from "./pages/EmployersPage";
import From from "./pages/Form"
import FormDeneme from "./pages/FormDeneme";
import CandidatesPage from "./pages/CandidatesPage";
import CandidateDetailPage from "./pages/CandidateDetailPage";
import ErrorPage from "./pages/ErrorPage";
import AddJobAd from "./pages/AddJobAd";
import ConfirmJobAdvPage from "./pages/ConfirmJobAdvPage";

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
              <Route exact path="/">
                <JobAdvertisementPage />
              </Route>
            </Dashboard>
          </Route>

          <Route path="/addadvertisement">
            <Dashboard>
              <Route path="/addadvertisement">
                <AddJobAd />
              </Route>
            </Dashboard>
          </Route>

          <Route path="/addtest">
            <Dashboard>
              <FormDeneme />
            </Dashboard>
          </Route>

          <Route path="/addtest2">
            <Dashboard>
              <From />
            </Dashboard>
          </Route>


          <Route path="/addtest3">
            <Dashboard>
              <AddJobAdvertisementPage />
            </Dashboard>
          </Route>


          <Route path="/jobDetail/:JobAdvertisementId">
            <Dashboard>
              <Route path="/jobDetail/:JobAdvertisementId">
                <JobAdvertisementDetails />
              </Route>
            </Dashboard>
          </Route>


          <Route path="/employer/:employerId">
            <Dashboard>
              <Route path="/employer/:employerId">
                <EmployerDetailPage />
              </Route>
            </Dashboard>
          </Route>

          <Route path="/employers">
            <Dashboard>
              <Route path="/employers">
                <Employers />
              </Route>
            </Dashboard>
          </Route>


          <Route path="/candidates">
            <Dashboard>
              <Route path="/candidates">
                <CandidatesPage />
              </Route>
            </Dashboard>
          </Route>

          <Route path="/candidate/:candidateId">
            <Dashboard>
              <Route path="/candidate/:candidateId">
                <CandidateDetailPage />
              </Route>
            </Dashboard>
          </Route>

          <Route path="/disconfirmedadvertisements">
            <Dashboard>
                <ConfirmJobAdvPage/>
            </Dashboard>
          </Route>

          <Route component={ErrorPage} />

        </Switch>
      </Router>
    </ThemeProvider>

  );
}

export default App;
