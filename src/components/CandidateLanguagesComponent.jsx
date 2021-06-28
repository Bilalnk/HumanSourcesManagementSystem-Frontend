import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { Save as SaveIcon, Close as CloseIcon, Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import CircularProgress from "@material-ui/core/CircularProgress";
import {
        Typography, CardHeader, IconButton, Divider, Card,
        Table, TableHead, TableRow, TableContainer, TableBody, TableCell
} from '@material-ui/core';

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
        const [updatedInfos, setUpdatedInfos] = useState(false)
        const [error, setError] = useState("")

        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleSave = () => {
                candidateLanguageService.add(changes).then((result) => {
                        console.log(result.data)
                        if (!result.data.success) {
                                setError(result.data.message)
                                toast.error(error)
                        } else {
                                toast.success("Dil Eklendi")
                        }
                }
                )
                handleEdit()
        }

        const handleDelete = (id) => {
                candidateLanguageService.delete(id).then((result) => {
                        if (!result.data.success) {
                                setError(result.data.message)
                                toast.error(error)
                        } else {
                                toast.success(result.data.message)
                        }
                }
                )
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

        //TODO veriler eklenince veya silinince anlık güncellenmiyor
        useEffect(() => {

                setUpdatedInfos(false)

                candidateLanguageService.getByCandidateId(candidateId).then((result) => {
                        setInfo(result.data.data)
                        setLoading(false)
                })

        }, [updatedInfos])

        if (isLoading) {
                return (
                        <div className={classes.loadingRoot}>
                                <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
                        </div>
                );
        }

        if (info.length === 0) {
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

                                                        <IconButton aria-label="settings" onClick={(e) => {
                                                                handleSave()
                                                                setUpdatedInfos(true)
                                                        }}>
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
                                                                <TableCell align="center">Düzenle</TableCell>
                                                        </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                        {info.map((inf) => (
                                                                <TableRow key={inf.id}>
                                                                        <TableCell component="th" scope="row">
                                                                                {inf.languages.languagesName}
                                                                        </TableCell>
                                                                        <TableCell align="center">{inf.languageLevels.languageLevel}</TableCell>
                                                                        <TableCell align="center">
                                                                                <IconButton aria-label="settings" onClick={() => {
                                                                                        handleDelete(inf.id);
                                                                                        setUpdatedInfos(true)
                                                                                }}>
                                                                                        <DeleteIcon />
                                                                                </IconButton>
                                                                        </TableCell>
                                                                </TableRow>
                                                        ))}
                                                </TableBody>
                                        </Table>
                                </TableContainer>}


                </Card>




        )
}

export default CandidateLanguagesComponent
