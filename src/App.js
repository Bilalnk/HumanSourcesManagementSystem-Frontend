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
              {/* <AddJobAdvertisementPage /> */}
              {/* <From/> */}
              <FormDeneme />
            </Route>

            <Route path="/jobDetail/:JobAdvertisementId">
              <JobAdvertisementDetails />
            </Route>

            <Route path="/employer/:employerId">
              <EmployerDetailPage />
            </Route>

            <Route path="/employers">
              <Employers />
            </Route>

            <Route path="/candidates">
              <CandidatesPage />
            </Route>

            <Route path="/candidate/:candidateId">
              <CandidateDetailPage />
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
