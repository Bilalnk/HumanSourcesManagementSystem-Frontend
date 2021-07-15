import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import ErrorPage from "./ErrorPage";
import JobAdvertisementService from "../services/jobAdvertisementService";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  error: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

function JobAdvertisementPage() {
  const classes = useStyles();
  const history = useHistory();

  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isFavori, setFavori] = useState();

  const addToFavorite = (id) => {
      console.log(id)
  }

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdveritsementDetails()
      .then(
        (result) => setJobAdvertisements(result.data.data),
        setIsError(false)
      )
      .catch(() => setIsError(true));
  }, []);

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <TableContainer component={Paper}>
      <Paper elevation={5}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Firma Adı </TableCell>
              <TableCell align="left"> İş Pozisyonu</TableCell>
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
                <TableCell align="center">
                  {job.publishedDate.substring(0, 10)}
                </TableCell>
                <TableCell align="center">
                  {job.lastDateToApply.substring(0, 10)}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => history.push("/jobDetail/" + job.id)}
                  >
                    İNCELE
                  </Button>
                </TableCell>
                {/* <TableCell align="center">
                  <IconButton onClick={() => addToFavorite(job.id)}>
                    <FavoriteBorderOutlined />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </TableContainer>
  );
}

export default JobAdvertisementPage;
