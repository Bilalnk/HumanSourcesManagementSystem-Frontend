import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Table } from "semantic-ui-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import JobAdvertisementService from "../services/jobAdvertisementService";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography";
import ErrorGif from "../error.gif";


import { toast } from 'react-toastify';

import { useSelector } from 'react-redux'

import { FavoriteBorderOutlined } from "@material-ui/icons";
import CandidateFavoriteJobsService from "../services/candidateFavoriteJobsService";

const useStyles = makeStyles((theme) => ({
        loadingRoot: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& > * + *": {
                        marginRight: theme.spacing(3),
                },
        },
        tables: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",

                "& > div": {
                        marginRight: 15,
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
        positionDescription: {
                fontSize: 16,
                textAlign: 'center',
                lineHeight: 2
        }
}));

function JobAdvertisementDetails() {
        let jobAdvertisementService = new JobAdvertisementService();
        let candidateFavoriteJobsService = new CandidateFavoriteJobsService()

        const history = useHistory()
        const classes = useStyles();
        const { JobAdvertisementId } = useParams();
        const [selectedJobAdvertisement, setSelectedJobAdvertisement] = useState();
        const [isLoading, setLoading] = useState(true);

        const { currentUser } = useSelector(state => state.user)
        const { userRole } = useSelector(state => state.role)

        const preventDefault = (event) => event.preventDefault();

        useEffect(() => {
                setLoading(true);
                jobAdvertisementService
                        .getJobAdveritsementById(JobAdvertisementId)
                        .then((result) => {
                                console.log(selectedJobAdvertisement);
                                setSelectedJobAdvertisement(result.data.data);
                                setLoading(false);
                        })
                        .catch();
        }, []);

        const handleJobAddToFav = () => {

                const model = {
                        "candidates": {
                                "id": currentUser.user.id
                        },
                        "jobAdvertisement": {

                                "id": JobAdvertisementId
                        }
                }

                candidateFavoriteJobsService.add(model)
                        .then((result) => {
                                if (result.data.success) {
                                        toast.success(result.data.message)
                                } else {
                                        toast.error(result.data.message)
                                }
                        })
        }

        if (isLoading) {
                return (
                        <div className={classes.loadingRoot}>
                                <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
                        </div>
                );
        }

        if (!selectedJobAdvertisement) {
                return (
                        <div>
                                <img src={ErrorGif} alt="loading..." />
                                Hata oluştu...
                        </div>
                );
        }

        return (
                <div className={classes.tables}>
                        <Grid container spacing={3}>
                                <Grid item xs={8}>
                                        <Table fixed>
                                                <Table.Header>
                                                        <Table.Row>
                                                                <Table.HeaderCell colSpan="2">

                                                                        <Typography className={classes.tableHeader}> Pozisyon Açıklaması </Typography>
                                                                </Table.HeaderCell>
                                                        </Table.Row>
                                                </Table.Header>

                                                <Table.Body>

                                                        <Table.Row>
                                                                <Table.Cell colSpan="2">
                                                                        <Typography className={classes.positionDescription}> {selectedJobAdvertisement.jobDescription} </Typography>

                                                                </Table.Cell>
                                                        </Table.Row>
                                                </Table.Body>

                                                {userRole.role == "CANDIDATE" ?

                                                        <Table.Footer>
                                                                <Table.Row>
                                                                        <Table.HeaderCell colSpan="1">

                                                                                <Button
                                                                                        variant='outlined'
                                                                                        color="primary"
                                                                                        fullWidth
                                                                                        onClick={() => handleJobAddToFav()}
                                                                                >
                                                                                        <FavoriteBorderOutlined style={{ marginRight: 5 }} />
                                                                                        FAVORİLERE EKLE
                                                                                </Button>

                                                                        </Table.HeaderCell>
                                                                        <Table.HeaderCell colSpan="1">

                                                                                <Button
                                                                                        variant='contained'
                                                                                        color="primary"
                                                                                        fullWidth
                                                                                        onClick={() => console.log("BAŞVUR " + JobAdvertisementId)}
                                                                                >
                                                                                        BAŞVUR
                                                                                </Button>
                                                                        </Table.HeaderCell>
                                                                </Table.Row>
                                                        </Table.Footer>
                                                        :
                                                        null
                                                }

                                        </Table>
                                </Grid>
                                <div> </div>

                                <Grid item xs={4}>
                                        <div>

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
                                                                                {selectedJobAdvertisement.employer.companyName}
                                                                        </Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Email:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.employer.email}
                                                                        </Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Web Sitesi:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                <Link href={selectedJobAdvertisement.employer.webAddress} onClick={preventDefault}>
                                                                                        {selectedJobAdvertisement.employer.webAddress}
                                                                                </Link>
                                                                        </Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Telefon Numarası:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.employer.phoneNumber}
                                                                        </Table.Cell>
                                                                </Table.Row>
                                                        </Table.Body>

                                                        <Table.Footer>
                                                                <Table.Row>
                                                                        <Table.HeaderCell colSpan="2">

                                                                                <Button variant='contained' color="primary" fullWidth onClick={() => history.push("/employer/" + selectedJobAdvertisement.employer.id)}>Firmaya Git</Button>
                                                                        </Table.HeaderCell>
                                                                </Table.Row>
                                                        </Table.Footer>
                                                </Table>


                                                <Table fixed>
                                                        <Table.Header>
                                                                <Table.Row>
                                                                        <Table.HeaderCell colSpan="2">

                                                                                <Typography className={classes.tableHeader}> Pozisyon Bilgileri </Typography>
                                                                        </Table.HeaderCell>
                                                                </Table.Row>
                                                        </Table.Header>

                                                        <Table.Body>
                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Pozisyon:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.jobPosition.position}
                                                                        </Table.Cell>
                                                                </Table.Row>

                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Çalışma Şekli:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.wayOfWork.wayWorking}
                                                                        </Table.Cell>
                                                                </Table.Row>

                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Çalışma Türü:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.workType.type}
                                                                        </Table.Cell>
                                                                </Table.Row>

                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Şehir:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.city.city}
                                                                        </Table.Cell>
                                                                </Table.Row>
                                                                <Table.Row>
                                                                        <Table.Cell >
                                                                                <Typography className={classes.tableCellLeft}> Açık Pozisyon:  </Typography>
                                                                        </Table.Cell>
                                                                        <Table.Cell>
                                                                                {selectedJobAdvertisement.numberOfOpenPosition}
                                                                        </Table.Cell>
                                                                </Table.Row>
                                                                {selectedJobAdvertisement.minSalary == null || selectedJobAdvertisement.maxSalary == null ?
                                                                        null :
                                                                        <Table.Row>
                                                                                <Table.Cell >
                                                                                        <Typography className={classes.tableCellLeft}> Maaş Aralığı:  </Typography>
                                                                                </Table.Cell>
                                                                                <Table.Cell>
                                                                                        {selectedJobAdvertisement.minSalary} - {selectedJobAdvertisement.maxSalary}
                                                                                </Table.Cell>
                                                                        </Table.Row>

                                                                }


                                                        </Table.Body>
                                                </Table>
                                        </div>
                                </Grid>
                        </Grid>
                </div>
        );
}

export default JobAdvertisementDetails;
