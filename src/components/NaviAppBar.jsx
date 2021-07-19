import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import { useHistory } from 'react-router'
import { Typography, makeStyles } from "@material-ui/core";

import { useSelector } from 'react-redux'

import { useEffect } from "react";

import SignIn from "./SignIn";
import SignOut from "./SignOut";

const drawerWidth = 300
;

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

        const {currentUser} = useSelector(state => state.user)


        useEffect(() => {
                if(currentUser){
                        setIsAuthenticated(true)
                }
        }, [])

        function handleSignOut(params) {
                setIsAuthenticated(false);
        }

        function handleSignIn(params) {
                setIsAuthenticated(true);
                history.push("/login");
        }

        return (
                <AppBar className={classes.appbar}>
                        <ToolBar>
                                <Typography className={classes.siteName}>HRMS</Typography>

                                

                                {isAuthenticated ? <SignIn user = {currentUser} signOut={handleSignOut} /> : <SignOut SignIn={handleSignIn}/>}
                        </ToolBar>
                </AppBar>
        );
}

export default NaviAppBar;
