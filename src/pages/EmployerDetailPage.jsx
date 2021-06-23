
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import EmployerService from "../services/employersService";
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography";
import ErrorGif from "../error.gif";

import TableMaterial from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import JobAdvertisementService from '../services/jobAdvertisementService';

const useStyles = makeStyles((theme) => ({
        loadingRoot: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& > * + *": {
                        marginRight: theme.spacing(3),
                },
        },
        tableCellLeft: {
                fontWeight: "bold",
        },
        tableHeader: {

                fontWeight: 'bold',
                fontSize: 16,
                display: 'flex',
                justifyContent: 'center'
        },

}));


function EmployersPage() {
        const classes = useStyles();
        const [isLoading, setLoading] = useState(true);
        const [selectedEmployer, setSelectedEmployer] = useState()
        const [advertisementOfEmployer, setAdvertisementOfEmployer] = useState([])
        const { employerId } = useParams();


        useEffect(() => {
                setLoading(true);
                let employerService = new EmployerService();
                employerService.getById(employerId)
                        .then((result) => {
                                setSelectedEmployer(result.data.data);
                                setLoading(false);
                                console.log(selectedEmployer);
                        })
                        .catch();

                let jobAdvertisementService = new JobAdvertisementService();
                jobAdvertisementService.getByActiveTrueAndEmployerId(employerId).then((result) => {
                        console.log(advertisementOfEmployer);
                        setAdvertisementOfEmployer(result.data.data);
                        setLoading(false);
                })
                        .catch();

        }, []);

        if (isLoading) {
                return (
                        <div className={classes.loadingRoot}>
                                <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
                        </div>
                );
        }

        if (false) {
                return (
                        <div>
                                <img src={ErrorGif} alt="loading..." />
                                Hata oluştu...
                        </div>
                );
        }


        return (

                <Grid container spacing={3}>

                        <Grid item xs={12}>

                                <Table fixed>
                                        <Table.Header>
                                                <Table.Row>
                                                        <Table.HeaderCell colSpan="2">

                                                                <Typography className={classes.tableHeader}> Firma Bilgileri </Typography>
                                                        </Table.HeaderCell>
                                                </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                                <Table.Row>
                                                        <Table.Cell >
                                                                <Typography className={classes.tableCellLeft}> Firma İsmi:  </Typography>
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                                {selectedEmployer.companyName}
                                                        </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                        <Table.Cell >
                                                                <Typography className={classes.tableCellLeft}> Email:  </Typography>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                                {selectedEmployer.email}
                                                        </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                        <Table.Cell >
                                                                <Typography className={classes.tableCellLeft}> Web Sitesi:  </Typography>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                                <Link href={selectedEmployer.webAddress} onClick={console.log("web adrresine bastın")}>
                                                                        {selectedEmployer.webAddress}
                                                                </Link>
                                                        </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                        <Table.Cell >
                                                                <Typography className={classes.tableCellLeft}> Telefon Numarası:  </Typography>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                                {selectedEmployer.phoneNumber}
                                                        </Table.Cell>
                                                </Table.Row>
                                        </Table.Body>
                                </Table>
                        </Grid>


                        <Grid item xs={12}>

                                <TableContainer component={Paper}>
                                        <TableMaterial className={classes.table} aria-label="simple table">
                                        <Table.Header>
                                                <Table.Row>
                                                        <Table.HeaderCell colSpan="5">

                                                                <TableCell className={classes.tableHeader}> Firma İlanları </TableCell>
                                                        </Table.HeaderCell>
                                                </Table.Row>
                                        </Table.Header>
                                                <TableHead>

                                                        <TableRow>
                                                                <TableCell> Firma Adı </TableCell>
                                                                <TableCell align="center">  İş Pozisyonu</TableCell>
                                                                <TableCell align="center">Açık Pozisyon</TableCell>
                                                                <TableCell align="center">Yayın Tarihi</TableCell>
                                                                <TableCell align="center">Son Başvuru Tarihi</TableCell>
                                                        </TableRow>
                                                </TableHead>
                                                <TableBody>

                                                        {advertisementOfEmployer.map((adv) => (

                                                                <TableRow hover key={adv.id}>
                                                                        <TableCell component="th" scope="row">
                                                                                {adv.id}
                                                                        </TableCell>

                                                                        <TableCell align="center">{adv.jobPosition.position}</TableCell>
                                                                        <TableCell align="center">{adv.numberOfOpenPosition}</TableCell>
                                                                        <TableCell align="center">{adv.publishedDate.substring(0, 10)}</TableCell>
                                                                        <TableCell align="center">{adv.closingDate.substring(0, 10)}</TableCell>
                                                                </TableRow>
                                                        ))}


                                                </TableBody>
                                        </TableMaterial>
                                </TableContainer>
                        </Grid>
                </Grid >
        )

}
export default EmployersPage
