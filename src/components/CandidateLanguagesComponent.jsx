import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import CircularProgress from "@material-ui/core/CircularProgress";

import CandidateLanguageService from "../services/candidateLanguagesService"

const useStyles = makeStyles((theme) => ({
        table: {
                minWidth: 500,
                maxWidth: 650,
        }, 
        noInfo: {
                display: 'flex',
                justifyContent: 'center',
                color: '#ff0000',
                padding: 15
        },
        container: {
                display: 'flex',
                justifyContent: 'center',
        },
        loadingRoot: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& > * + *": {
                        marginRight: theme.spacing(3),
                },
        },
}));



function CandidateLanguagesComponent({candidateId}) {
        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true);

        useEffect(() => {

                let candidateLanguageService = new CandidateLanguageService();
                candidateLanguageService.getByCandidateId(candidateId).then((result) => {
                        setInfo(result.data.data)
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

        if (info.length == 0) {
                return (
                        <div className={classes.noInfo}>
                                <Typography>
                                        DİL BİLGİSİ BULUNAMADI
                                </Typography>
                        </div>
                )
        }

        return (
                <TableContainer className= {classes.container}>
                        <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                        <TableRow>
                                                <TableCell>Dil </TableCell>
                                                <TableCell align="center">Seviye</TableCell>
                                        </TableRow>
                                </TableHead>
                                <TableBody>
                                        {info.map((inf) => (
                                                <TableRow key={inf.id}>
                                                        <TableCell component="th" scope="row">
                                                                {inf.languages.languagesName}
                                                        </TableCell>
                                                        <TableCell align="center">{inf.languageLevels.languageLevel}</TableCell>
                                                </TableRow>
                                        ))}
                                </TableBody>
                        </Table>
                </TableContainer>
        )
}

export default CandidateLanguagesComponent
