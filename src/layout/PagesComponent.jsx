import React from 'react'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => {

        return {
                page: {
                        background: '#f9f9f9',
                        width: '100%',
                        padding: theme.spacing(3)
                },
                toolbar: theme.mixins.toolbar,
        }
})

function PagesComponent({ children }) {
        const classes = useStyles()

        return (
                <div className={classes.page}>
                        <div className={classes.toolbar}></div>
                        {children}
                </div>
        )
}

export default PagesComponent