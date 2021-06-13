import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import JobAdvertisementService from "../services/jobAdvertisementService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function JobAdvertisementPage() {
  const classes = useStyles();

  const [jobAdvertisements, setJobAdvertisements] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByActiveTrue()
      .then((result) => setJobAdvertisements(result.data.data))
      .catch();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Firma Adı </TableCell>
            <TableCell align="left">İş Pozisyonu</TableCell>
            <TableCell align="center">Açık Pozisyon</TableCell>
            <TableCell align="center">Yayın Tarihi</TableCell>
            <TableCell align="center">Son Başvuru Tarihi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobAdvertisements.map((job) => (
            <TableRow hover key={job.id}>
              <TableCell component="th" scope="row">
               {job.employer.companyName}
              </TableCell>
              <TableCell align="left">{job.jobPosition.position}</TableCell>
              <TableCell align="center">{job.numberOfOpenPosition}</TableCell>
              <TableCell align="center">{job.publishedDate}</TableCell>
              <TableCell align="center">{job.closingDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default JobAdvertisementPage;
