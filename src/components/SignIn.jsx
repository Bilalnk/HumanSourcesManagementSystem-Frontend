import React from "react";
import DropDownMenu from "./DropDownMenu";
import { Avatar, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
        return {
                avatar: {
                        marginLeft: theme.spacing(2),
                },
                row: {
                        display: 'flex'
                      }
        };
});

function SignIn({signOut}) {
        const classes = useStyles();

        return (
                <div className ={classes.row}>
                        <DropDownMenu signOut = {signOut} />

                        <Avatar
                                src="https://avatars.githubusercontent.com/u/50082041?v=4"
                                className={classes.avatar}
                        />
                </div>
        );
}

export default SignIn;
