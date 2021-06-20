import React from 'react'
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Paper, Typography } from '@material-ui/core';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';

import CandidateSchoolInfoService from '../services/candidateSchoolInfoService'

const useStyles = makeStyles((theme) => ({


        rootTime: {

                maxWidth: 1000,
                marginBottom: 20,
                padding: 15,
                display: 'flex',
                justifyContent: 'start'


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

function CandidateSchoolInfoComponent({ candidateId }) {

        let candidateSchoolInfoService = new CandidateSchoolInfoService()
        const classes = useStyles();
        const [info, setInfo] = useState([])

        useEffect(() => {
                candidateSchoolInfoService.getAllByIdOrderDesc(candidateId).then((result) => {
                        setInfo(result.data.data)
                })
        }, [])



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
                                                                                title={inf.schoolDepartment.school.schoolName}
                                                                                subheader={inf.schoolDepartment.department.departmentName}
                                                                        >
                                                                        </CardHeader>

                                                                        <CardContent>
                                                                                <Typography variant="body1" color="textSecondary" component="p">
                                                                                        {inf.dateOfStart.substring(0, 10)} - {inf.dateOfFinish = null ? "" : inf.dateOfFinish.substring(0, 10)}
                                                                                </Typography>
                                                                        </CardContent>

                                                                </Card>
                                                        </TimelineContent>
                                                </TimelineItem>
                                        ))
}
                        </Timeline>
                </ThemeProvider>
        )
}

export default CandidateSchoolInfoComponent
