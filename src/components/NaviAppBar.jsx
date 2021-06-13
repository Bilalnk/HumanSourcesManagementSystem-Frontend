import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { useHistory } from 'react-router'
import { Typography, makeStyles } from "@material-ui/core";

import SignIn from "./SignIn";
import SignOut from "./SignOut";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
        return {
                appbar: {
                        width: `calc(100% - ${drawerWidth}px)`,
                },
                toolbar: theme.mixins.toolbar,

                siteName: {
                        flexGrow: 1,
                },
                avatar: {
                        marginLeft: theme.spacing(2),
                },
        };
});

function NaviAppBar() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const classes = useStyles();
        const history = useHistory()

        function handleSignOut(params) {
                setIsAuthenticated(false);
                history.push("/");
        }

        function handleSignIn(params) {
                setIsAuthenticated(true);
        }

        return (
                <AppBar className={classes.appbar}>
                        <ToolBar>
                                <Typography className={classes.siteName}>HRMS</Typography>

                                {isAuthenticated ? <SignIn signOut={handleSignOut} /> : <SignOut SignIn={handleSignIn}/>}
                        </ToolBar>
                </AppBar>
        );
}

export default NaviAppBar;
