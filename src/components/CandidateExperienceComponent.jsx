import React from 'react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Typography } from '@material-ui/core';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import CircularProgress from "@material-ui/core/CircularProgress";
import CandidateExperienceService from '../services/experienceService'

const useStyles = makeStyles((theme) => ({


        rootTime: {

                maxWidth: 1000,
                marginBottom: 20,
                padding: 15,
                display: 'flex',
                justifyContent: 'start'
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

function CandidateExperienceComponent({ candidateId }) {

        let candidateExperienceService = new CandidateExperienceService()
        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true);

        useEffect(() => {
                candidateExperienceService.getByCandidateIdDesc(candidateId).then((result) => {
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
                                        DENEYİM BİLGİSİ BULUNAMADI
                                </Typography>
                        </div>
                )
        }


        return (
                <ThemeProvider theme={theme}>
                        <Timeline
                                align='alternate'>

                                {info.map((inf) => (
                                        <TimelineItem>
                                                <TimelineSeparator>
                                                        <TimelineDot />
                                                        <TimelineConnector />
                                                </TimelineSeparator>

                                                <TimelineContent>
                                                        <Card elevation={3} className={classes.root}>
                                                                <CardHeader

                                                                        titleTypographyProps={{ variant: 'h6' }}
                                                                        title={inf.workPlace}
                                                                        subheader={inf.startingDate - inf.departureDate}
                                                                >
                                                                </CardHeader>

                                                                <CardContent>
                                                                        <Typography variant="body1" color="textSecondary" component="p">
                                                                                sadsad
                                                                        </Typography>
                                                                </CardContent>

                                                        </Card>
                                                </TimelineContent>
                                        </TimelineItem>
                                ))}
                        </Timeline>
                </ThemeProvider>
        )
}

export default CandidateExperienceComponent

