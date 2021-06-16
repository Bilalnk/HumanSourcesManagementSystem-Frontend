import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import ErrorGif from "../errorMoon.gif";


const useStyles = makeStyles({

        error: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: 560
        }
});

function ErrorPage() {

        const classes = useStyles();

        return (
                <div className={classes.error}>
                        <img src={ErrorGif} alt="Error..." />
                        
                </div>
        )
}

export default ErrorPage
