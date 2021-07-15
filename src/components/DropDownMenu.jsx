import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core';

import { useEffect } from "react";
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => {
  return {
    title: {
      color: '#ffffff'
    },

  }
})



export default function DropDownMenu({ signOut, name }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles()
  const history = useHistory()
  const { currentUser } = useSelector(state => state.user)
  const { userRole } = useSelector(state => state.role)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.currentTarget) {

      if ( e.currentTarget.innerText === "Logout") {
        console.log(e.currentTarget.innerText)

      }
    }

    setAnchorEl(null);

  };

  function dirToCV () {
    return handleClose,
    history.push("/candidate/" + currentUser.user.id)
  }

  useEffect(() => {

  }, [])

  return (
    <div >
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.title}>
        {name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>

        {userRole.role == "CANDIDATE" ?
          <MenuItem onClick={
            dirToCV
          }>
            Öz Geçmişim
          </MenuItem>
          :
          null
        }

        <MenuItem onClick={handleClose, signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}