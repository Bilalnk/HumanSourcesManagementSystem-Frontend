import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import ErrorGif from "../404error.gif"


const useStyles = makeStyles({

        error: {
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                padding: '1em',
                justifyContent: 'center',
                background:'#1b1b1b',

        },
        img:{
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
        }
});

function ErrorPage() {

        const classes = useStyles();

        return (
                <div className={classes.error}>
                        <img className={classes.img} src={ErrorGif} alt="Error..." />
                        
                </div>
        )
}

export default ErrorPage
