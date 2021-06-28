import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';


import { useParams } from "react-router-dom";
import Card from '@material-ui/core/Card';
import { CardHeader } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { Divider } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";

import CandidateLanguageService from "../services/candidateLanguagesService"
import CandidateEditLanguagesComponent from './CandidateEditLanguagesComponent';

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
        root: {

                maxWidth: 900,
                minWidth: 900,
                marginBottom: 20,
                padding: 15

        },
}));



function CandidateLanguagesComponent({ candidateId }) {

        let candidateLanguageService = new CandidateLanguageService();

        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [changes, setChanges] = useState([])
        const [isLoading, setLoading] = useState(true);
        const [isClicked, setCliCked] = useState(false)
        const [error, setError] = useState("")

        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleSave = () => {
                candidateLanguageService.add(changes).then((result) => {
                        console.log(result.data)
                        if(!result.data.success){
                                setError(result.data.message)
                                console.log(error)
                        }
                }
                )
                handleEdit()
        }

        const getChanges = (lang, level) => {
                setChanges({
                        candidates: {
                                id: candidateId
                        },
                        languageLevels: {
                                id: level
                        },
                        languages: {
                                id: lang
                        }
                })
        }


        useEffect(() => {

                candidateLanguageService.getByCandidateId(candidateId).then((result) => {
                        setInfo(result.data.data)
                        setLoading(false)
                })

        }, [isClicked])

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

                <Card className={classes.root}>
                        <CardHeader

                                action={
                                        <div>
                                                {isClicked ? <div>
                                                        <IconButton aria-label="settings" onClick={(key) => handleEdit()}>
                                                                <CloseIcon />

                                                        </IconButton>

                                                        <IconButton aria-label="settings" onClick={(e) => handleSave()}>
                                                                <SaveIcon />
                                                        </IconButton>

                                                </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                        <AddIcon />

                                                </IconButton>}
                                        </div>
                                }

                                title="DİL BİLGİSİ"
                        >
                        </CardHeader>

                        <Divider />

                        {isClicked ?
                                <CandidateEditLanguagesComponent candidateId={candidateId} getChanges={getChanges} />
                                :
                                <TableContainer className={classes.container}>
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
                                </TableContainer>}


                </Card>




        )
}

export default CandidateLanguagesComponent
