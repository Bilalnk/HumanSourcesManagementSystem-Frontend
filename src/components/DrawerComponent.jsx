import React from "react";
import { Drawer, makeStyles, useTheme, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AddIcon from '@material-ui/icons/Add';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';

const drawerWidth = 300

const useStyles = makeStyles((theme) => {
        return {
                drawer: {
                        width: drawerWidth

                },
                drawerPaper: {
                        width: drawerWidth,
                },
                menuTitle: {
                        display: 'flex',
                        justifyContent: 'center',
                        padding: 12
                },
                active: {
                        background: '#5959ff',
                        color: '#ffffff',
                        border: "1px dashed #5959ff",
                        '&:hover': {
                                color: '#5959ff',
                                border: "1px dashed #5959ff"
                        }
                }
        }
})


function DrawerComponent() {

        const classes = useStyles()
        const history = useHistory()
        const location = useLocation()

        const theme = useTheme();

        const { userRole } = useSelector(state => state.role)
        const [open, setOpen] = React.useState(false);

        const handleDrawerOpen = () => {
                setOpen(true);
        };

        const handleDrawerClose = () => {
                setOpen(false);
        };

        const menuItems =

                userRole.role == "CANDIDATE" ?
                        [


                                {
                                        text: 'İş ilanları',
                                        icon: <PlaylistAddCheckIcon />,
                                        path: '/'
                                },
                                {
                                        text: 'İş verenler',
                                        icon: <BusinessIcon />,
                                        path: '/employers'
                                },
                        ]
                        :

                        userRole.role == "EMPLOYER" ?
                                [
                                        {
                                                text: 'İş ilanları',
                                                icon: <PlaylistAddCheckIcon />,
                                                path: '/'
                                        },

                                        {
                                                text: 'İş ilanı Ekle',
                                                icon: <AddIcon />,
                                                path: '/addadvertisement'
                                        },
                                        {
                                                text: 'İş Arayanlar',
                                                icon: <WorkIcon />,
                                                path: '/candidates'
                                        }
                                ]

                                :
                                userRole.role == "EMPLOYEE" ?
                                        [
                                                {
                                                        text: 'İş ilanları',
                                                        icon: <PlaylistAddCheckIcon />,
                                                        path: '/'
                                                },
                                                {
                                                        text: 'İş verenler',
                                                        icon: <BusinessIcon />,
                                                        path: '/employers'
                                                },
                                                {
                                                        text: 'İş Arayanlar',
                                                        icon: <WorkIcon />,
                                                        path: '/candidates'
                                                },
                                                {
                                                        text: 'İş İlanları Onayla',
                                                        icon: <CheckIcon />,
                                                        path: '/disconfirmedadvertisements'
                                                }
                                        ]
                                        :
                                        [

                                        ]

        return (
                <Drawer
                        className={classes.drawer}
                        variant='permanent'
                        anchor="left"
                        classes={{ paper: classes.drawerPaper }}
                >

                        <div className={classes.drawerHeader}>
                                <IconButton onClick={handleDrawerClose}>
                                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                </IconButton>
                        </div>

                        <div className={classes.menuTitle}>
                                <Typography variant="h5">
                                        MENU
                                </Typography>
                        </div>
                        <Divider />

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
                                                                <ListItemText primary={item.text} />
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
