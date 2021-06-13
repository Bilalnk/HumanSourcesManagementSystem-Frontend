import React from "react";
import { Drawer, makeStyles, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useLocation } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles(() => {
        return {
                drawer: {
                        width: drawerWidth
                },
                drawerPaper:{
                        width: drawerWidth
                },
                menuTitle: {
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 12
                },
                active: {
                        background: '#5959ff',
                        color: '#ffffff',
                        '&:hover': {
                                color: '#5959ff'
                        } 
                }
        }
})


function DrawerComponent() {

        const classes = useStyles()
        const history = useHistory()
        const location = useLocation()

        const menuItems = [
                {
                        text:'Job Advertisement',
                        icon: <PlaylistAddCheckIcon/>,
                        path:'/'
                },
                {
                        text:'Add a Job Advertisement',
                        icon: <AddIcon/>,
                        path:'/addadvertisement'
                }
        ]

        return (
                <Drawer
                        className={classes.drawer}
                        variant='permanent'
                        anchor="left"
                        classes={{ paper: classes.drawerPaper}}
                >
                        <div  className={classes.menuTitle}>
                                <Typography variant="h5">
                                        MENU
                                </Typography>
                        </div>
                        <Divider/>

                        <List>
                                {
                                        menuItems.map(item => (
                                                <div key={item.text}>
                                                <ListItem
                                                        
                                                        button
                                                        onClick={() => history.push(item.path)}
                                                        className={location.pathname === item.path ? classes.active : null}
                                                >
                                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                                        <ListItemText primary={item.text}/>
                                                </ListItem>

                                                <Divider light={true} variant="middle" component="hr" />

                                                </div>
                                        ))
                                }
                        </List>
                </Drawer>
        );
}

export default DrawerComponent;
