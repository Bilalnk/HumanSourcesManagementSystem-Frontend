import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import ErrorGif from "../404error.gif"


const useStyles = makeStyles({

        error: {
                display: 'flex',
                justifyContent: 'center',
                alignItems:'center',
                width: '100%',
                backgroundColor: '#1b1b1b'

        },
        img:{
                height: 760,
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
