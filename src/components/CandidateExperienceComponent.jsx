import React from 'react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Typography } from '@material-ui/core';

import { Edit as EditIcon, Close as CloseIcon, Add as AddIcon, Delete } from '@material-ui/icons';
import { IconButton, Divider } from '@material-ui/core';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {  ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";
import CandidateExperienceService from '../services/experienceService'
import CandidateExperienceEditComponent from './CandidateExperienceEditComponent';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({


        rootTime: {

                maxWidth: 1000,
                marginBottom: 20,
                padding: 15,
                display: 'flex',
                justifyContent: 'start'
        },
        root: {

                maxWidth: 900,
                minWidth: 900,
                marginBottom: 20,
                padding: 15

        },
        noInfo: {
                display: 'flex',
                justifyContent: 'center',
                color: '#ff0000',
                padding: 15
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




function CandidateExperienceComponent({ candidateId, handleClose }) {

        let candidateExperienceService = new CandidateExperienceService()
        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true);
        const [isClicked, setCliCked] = useState(false)
        const [isChanged, setChanged] = useState(false)


        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleDelete = (id) => {
                candidateExperienceService.delete(id).then((result) => {
                        console.log(result.data)
                        if(result.data.success){
                                toast.success(result.data.message)
                        }else{
                                toast.error(result.data.message)
                        }

                })
        }


        useEffect(() => {
                setChanged(false)
                candidateExperienceService.getByCandidateIdDesc(candidateId).then((result) => {
                        setInfo(result.data.data)
                        setLoading(false)
                        handleClose()
                })
        }, [isClicked | isChanged])

        if (isLoading) {
                return (
                        <div className={classes.loadingRoot}>
                                <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
                        </div>
                );
        }


        return (


                <Card className={classes.root}>
                        <CardHeader

                                action={
                                        <div>
                                                {isClicked ? <div>
                                                        <IconButton aria-label="settings" onClick={() => handleEdit()}>
                                                                <CloseIcon />
                                                        </IconButton>

                                                </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                        <AddIcon />

                                                </IconButton>}
                                        </div>
                                }

                                title="DENEYİM"
                        >
                        </CardHeader>
                        <Divider />

                        {isClicked ?

                                <CandidateExperienceEditComponent handleEdit={handleEdit} candidateId={candidateId} />

                                :

                                <div> {
                                        info.length == 0 ?

                                                <div className={classes.noInfo}>
                                                        <Typography>
                                                                DENEYİM BİLGİSİ BULUNAMADI
                                                        </Typography>
                                                </div>

                                                :

                                                <ThemeProvider>
                                                        <Timeline
                                                                align='alternate'>

                                                                {info.map((inf) => (
                                                                        <TimelineItem>
                                                                                <TimelineSeparator>
                                                                                        <TimelineDot />
                                                                                        <TimelineConnector />
                                                                                </TimelineSeparator>

                                                                                <TimelineContent>
                                                                                        <Card elevation={3} >
                                                                                                <CardHeader

                                                                                                        titleTypographyProps={{ variant: 'h6' }}
                                                                                                        title={inf.workPlace}
                                                                                                        subheader={`${inf.startingDate.substring(0, 10)} - ${inf.departureDate.substring(0, 10)}`}
                                                                                                >
                                                                                                </CardHeader>

                                                                                                <CardContent >
                                                                                                        <Typography variant="body1" color="textSecondary" component="p">
                                                                                                                {inf.jobPositions.position}
                                                                                                        </Typography>
                                                                                                </CardContent>

                                                                                                <CardActions
                                                                                                style={{background: "linear-gradient(to left, #2c3e50, #2980b9)", maxHeight: 35}}
                                                                                                >

                                                                                                        <IconButton aria-label="settings" onClick={() => {

                                                                                                                handleDelete(inf.id)
                                                                                                                setChanged(true);
                                                                                                        }}>
                                                                                                                <Delete style={{color: "#ffffff"}}/>
                                                                                                        </IconButton>
                                                                                                        <IconButton aria-label="settings" onClick={() => console.log(inf)}>
                                                                                                                <EditIcon style={{color: "#ffffff"}}/>
                                                                                                        </IconButton>


                                                                                                </CardActions>

                                                                                        </Card>
                                                                                </TimelineContent>
                                                                        </TimelineItem>
                                                                ))}
                                                        </Timeline>
                                                </ThemeProvider>
                                }
                                </div>


                        }

                </Card>

        )
}

export default CandidateExperienceComponent

