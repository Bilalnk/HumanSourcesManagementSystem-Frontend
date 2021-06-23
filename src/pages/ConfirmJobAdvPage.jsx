import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button"
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from 'react';
import JobAdvertisementService from '../services/jobAdvertisementService';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
        table: {
                minWidth: 650,
        },
        error: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
        },
        loadingRoot: {
                display: 'flex',
                justifyContent: 'center'
        }
});

function ConfirmJobAdvPage() {


        let jobAdvertisementService = new JobAdvertisementService()

        const classes = useStyles();
        const history = useHistory()


        const [disconfirmed, setDisconfirmed] = useState([])
        const [confirmed, setConfirmed] = useState(false)
        const [isLoading, setIsLoading] = useState(true)

        useEffect(() => {

                handleDisconfirmed()
                setConfirmed(false)
                setIsLoading(false)
        }, [confirmed])

        const handleDisconfirmed = () => {
                setIsLoading(true)
                jobAdvertisementService.getByConfirmedByEmployeesFalseOrderByPublishedDateDesc().then((result => {
                        setDisconfirmed(result.data.data);
                       
                }))
                console.log(disconfirmed)

        }


        const handleConfirm = (confirm, id) => {

                jobAdvertisementService.updateAdvertisementConfirm(confirm, id)
                        .then((result) => console.log(result.data))
        }


        if (isLoading) {
                return (
                        <div className={classes.loadingRoot}>
                                <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
                        </div>
                );
        }



        return (
                <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                                <TableHead>

                                        <TableRow>
                                                <TableCell> Firma Adı </TableCell>
                                                <TableCell align="left">  İş Pozisyonu</TableCell>
                                                <TableCell align="center">Açık Pozisyon</TableCell>
                                                <TableCell align="center">Yayın Tarihi</TableCell>
                                                <TableCell align="center">Son Başvuru Tarihi</TableCell>
                                                <TableCell align="center">DETAY</TableCell>
                                                <TableCell align="center">ONAY</TableCell>
                                        </TableRow>
                                </TableHead>
                                <TableBody>
                                        {disconfirmed.map((job) => (
                                                <TableRow hover key={job.id}>
                                                        <TableCell component="th" scope="row">
                                                                {job.employer.companyName}
                                                        </TableCell>
                                                        <TableCell align="left">{job.jobPosition.position}</TableCell>
                                                        <TableCell align="center">{job.numberOfOpenPosition}</TableCell>
                                                        <TableCell align="center">{job.publishedDate.substring(0, 10)}</TableCell>
                                                        <TableCell align="center">{job.closingDate.substring(0, 10)}</TableCell>
                                                        <TableCell align="center"><Button variant='outlined' color="primary"
                                                                onClick={() => {
                                                                        history.push("/jobDetail/" + job.id)
                                                                }}>INCELE</Button></TableCell>

                                                        <TableCell align="center">
                                                                <Button variant='outlined' color="primary"
                                                                        onClick={() => {
                                                                                handleConfirm(true, job.id);
                                                                                setConfirmed(true)
                                                                        }}>
                                                                        ONAYLA
                                                                </Button>
                                                        </TableCell>
                                                </TableRow>
                                        ))}
                                </TableBody>
                        </Table>
                </TableContainer>
        )
}

export default ConfirmJobAdvPage
