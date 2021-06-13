import React from 'react'
import {makeStyles } from '@material-ui/core'

import NaviAppBar from '../components/NaviAppBar'
import PagesComponent from './PagesComponent'
import DrawerComponent from '../components/DrawerComponent'

const useStyles = makeStyles(() => {
        return{
                root: {
                        display:'flex'
                }
        }
})


function Dashboard({children}) {

        const classes = useStyles()

        return (
                <div className={classes.root}>
                        
                        {/* NavBar */}
                        <NaviAppBar/>

                        {/* Left Side Drawer */}
                        <DrawerComponent/>
                        
                        {/* PAGES*/}
                        <PagesComponent children={children}/>

                        {/* FOOTER */}

                </div>
        )
}

export default Dashboard
