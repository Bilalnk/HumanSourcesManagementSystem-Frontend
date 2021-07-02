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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";
import CandidateSchoolInfoService from '../services/candidateSchoolInfoService'
import CandidateEditSchoolComponent from './CandidateEditSchoolComponent';

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
                minHeight: 300,
                marginBottom: 20,
                padding: 15
        },
        noInfo: {
                display: 'flex',
                justifyContent: 'center',
                color: '#ff0000',
                padding: 15
        },
        timelineConnector: {
                background: theme.palette.primary.light
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


const theme = createMuiTheme({
        overrides: {
                // MuiTimelineItem: {
                //         missingOppositeContent: {
                //                 '&::before': {
                //                         flex: 1
                //                 }
                //         }
                // },
                // MuiTimelineConnector: {
                //         root: {
                //                 marginBottom: -55
                //         }
                // },
                // MuiTimelineSeparator: {
                //         root: {
                //                 marginTop: 55
                //         }
                // }


        },
});

function CandidateSchoolInfoComponent({ candidateId, handleClose }) {

        let candidateSchoolInfoService = new CandidateSchoolInfoService()
        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true);
        const [isClicked, setCliCked] = useState(false)
        const [isChanged, setChanged] = useState(false)

        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleDelete = (id) => {
                candidateSchoolInfoService.delete(id).then((result) => {
                        console.log(result.data)
                        
                })
        }

        useEffect(() => {
                setChanged(false)
                candidateSchoolInfoService.getAllByIdOrderDesc(candidateId).then((result) => {
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

        if (info.length == 0) {
                return (
                        <div className={classes.noInfo}>
                                <Typography>
                                        OKUL BİLGİSİ BULUNAMADI
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
                                                        <IconButton aria-label="settings" onClick={() => handleEdit()}>
                                                                <CloseIcon />
                                                        </IconButton>

                                                </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                        <AddIcon />

                                                </IconButton>}
                                        </div>
                                }

                                title="OKUL BİLGİSİ"
                        >
                        </CardHeader>
                        <Divider />

                        {isClicked ?
                                <CandidateEditSchoolComponent handleEdit={handleEdit} candidateId = {candidateId}/>
                                
                                :

                                <ThemeProvider theme={theme}>
                                        <Timeline
                                                align='alternate'>

                                                {info.map((inf) => (
                                                        <TimelineItem>
                                                                <TimelineSeparator>
                                                                        <TimelineDot color="primary" />
                                                                        <TimelineConnector className={classes.timelineConnector} />
                                                                </TimelineSeparator>

                                                                <TimelineContent>
                                                                        <Card elevation={3} >

                                                                                <CardHeader

                                                                                        titleTypographyProps={{ variant: 'h6' }}
                                                                                        title={inf.schoolDepartment.school.schoolName}
                                                                                        subheader={inf.schoolDepartment.department.departmentName}
                                                                                >
                                                                                </CardHeader>

                                                                                <CardContent>
                                                                                        <Typography variant="body1" color="textSecondary" component="p">
                                                                                                {inf.dateOfStart.substring(0, 10)} - {inf.dateOfFinish = null ? "" : inf.dateOfFinish.substring(0, 10)}
                                                                                        </Typography>
                                                                                </CardContent>

                                                                                <CardActions
                                                                                 style={{background: "linear-gradient(to right, #2980b9, #2c3e50)", maxHeight: 35}}
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
                                                ))
                                                }
                                        </Timeline>
                                </ThemeProvider>
                        }
                </Card>


        )
}

export default CandidateSchoolInfoComponent
