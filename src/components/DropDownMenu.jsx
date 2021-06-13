import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    title: {
      color: '#ffffff'
    },
   
  }
})



export default function DropDownMenu({signOut}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);

    if (e.currentTarget.innerText === "Logout") {
      console.log(e.currentTarget.innerText)
      
    }
  };

  return (
    <div >
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.title}>
        Bilal
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose, signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}