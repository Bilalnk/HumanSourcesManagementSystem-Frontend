import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button"
import { useHistory } from 'react-router-dom'

import JobAdvertisementService from "../services/jobAdvertisementService";
import ErrorPage from "./ErrorPage";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
});

function JobAdvertisementPage() {
  const classes = useStyles();
  const history = useHistory()

  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService.getJobAdveritsementDetails()
      .then((result) => setJobAdvertisements(result.data.data), setIsError(false))
      .catch(() =>
        setIsError(true)
      );
  }, []);

  
  if (isError) {
    return (
      <ErrorPage/>
    )
  }


  return (
    <TableContainer component={Paper} >
      <Paper elevation={5} >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>

          <TableRow>
            <TableCell> Firma Adı </TableCell>
            <TableCell align="left">  İş Pozisyonu</TableCell>
            <TableCell align="center">Açık Pozisyon</TableCell>
            <TableCell align="center">Yayın Tarihi</TableCell>
            <TableCell align="center">Son Başvuru Tarihi</TableCell>
            <TableCell align="center">DETAY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobAdvertisements.map((job) => (
            <TableRow hover key={job.id}>
              <TableCell component="th" scope="row">
                {job.employerName}
              </TableCell>
              <TableCell align="left">{job.jobPositionName}</TableCell>
              <TableCell align="center">{job.openPosition}</TableCell>
              <TableCell align="center">{job.publishedDate.substring(0,10)}</TableCell>
              <TableCell align="center">{job.lastDateToApply.substring(0,10)}</TableCell>
              <TableCell align="center"><Button variant='outlined' color="primary" onClick={() => history.push("/jobDetail/" + job.id)}>İNCELE</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    </TableContainer>
  );
}

export default JobAdvertisementPage;
