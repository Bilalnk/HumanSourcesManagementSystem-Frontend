import React, { useState, useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button"
import EmployersService from "../services/employersService";
import { useHistory } from 'react-router-dom'

import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  loadingRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginRight: theme.spacing(3),
    },
  }
}));


function EmployersPage() {


  const history = useHistory()
  const classes = useStyles();
  const [employers, setEmployers] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let employersService = new EmployersService();
    employersService.getAll().then((result) => {
      setEmployers(result.data.data)
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className={classes.loadingRoot}>
        <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>

          <TableRow>
            <TableCell> Firma Adı </TableCell>
            <TableCell align="left">  Web Adresi</TableCell>
            <TableCell align="center">Email Adresi</TableCell>
            <TableCell align="center">Telefon Numarası</TableCell>
            <TableCell align="center">Firmaya Git</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employers.map((employer) => (
            <TableRow hover key={employer.id}>
              <TableCell component="th" scope="row">
                {employer.companyName}
              </TableCell>
              <TableCell align="left">{employer.webAddress}</TableCell>
              <TableCell align="center">{employer.email}</TableCell>
              <TableCell align="center">{employer.phoneNumber}</TableCell>
              <TableCell align="center"><Button variant='outlined' color="primary" fullWidth onClick={() => history.push("/employer/" + employer.id)} >İNCELE</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EmployersPage
