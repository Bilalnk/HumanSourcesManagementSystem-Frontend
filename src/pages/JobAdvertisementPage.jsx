import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FavoriteBorderOutlined } from "@material-ui/icons";

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';

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
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

import ErrorPage from "./ErrorPage";
import JobAdvertisementService from "../services/jobAdvertisementService";
import JobFilterComponent from "../components/JobFilterComponent";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  error: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  wrapper: {
    display: 'flex'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function JobAdvertisementPage() {
  const classes = useStyles();
  const history = useHistory();

  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [isError, setIsError] = useState(false)




  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRowCount, setTotalRowCount] = React.useState();
  const [currentItemCount, setCurrentItemCount] = React.useState();
  const [filter, setFilter] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isUpdated, setUpdated] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
    setUpdated(true);
  };

  const handleFilter = (filterValues) => {
    setFilter(filterValues)
    setUpdated(true);

  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.currentTarget.innerText) {
      setRowsPerPage(parseInt(e.currentTarget.innerText))
      setPage(1)
      setUpdated(true);
    }
    setAnchorEl(null);
  };



  useEffect(() => {
    setUpdated(false);
    setOpen(true)
    let jobAdvertisementService = new JobAdvertisementService();

    jobAdvertisementService
      .getFilteredAndPaginated(filter, page, rowsPerPage)
      .then(
        (result) => {
          console.log(result.data.data)
          setJobAdvertisements(result.data.data.jobAdvertisementDto)
          setTotalRowCount(result.data.data.jobCount);
          setOpen(false)
          setCurrentItemCount(result.data.data.jobAdvertisementDto.length)

        },

        setIsError(false)
      )
      .catch(() => {
        setIsError(true)
        setOpen(false)
      });
  }, [isUpdated]);

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className={classes.wrapper}>

      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>

      <TableContainer component={Paper} style={{ height: '100%' }}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>



          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }}>
              Görüntülenen ilan: {currentItemCount}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

              <div>
                Satır sayısı:
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}  >
                  {rowsPerPage} <ArrowDropDownIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>10</MenuItem>
                  <MenuItem onClick={handleClose}>20</MenuItem>
                  <MenuItem onClick={handleClose}>30</MenuItem>
                </Menu>
              </div>

              <Pagination variant="outlined" color="primary" count={totalRowCount % rowsPerPage == 0 ? totalRowCount / rowsPerPage : totalRowCount / rowsPerPage < 0 ? 1 : parseInt(totalRowCount / rowsPerPage) + 1}
                page={page}
                onChange={handleChangePage} />

            </div>
          </div>
        </Paper>
      </TableContainer>

      <JobFilterComponent handleFilter={handleFilter} />
    </div>
  );
}

export default JobAdvertisementPage;
