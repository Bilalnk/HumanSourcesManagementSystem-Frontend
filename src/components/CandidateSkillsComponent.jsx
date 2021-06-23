import React from 'react'
import Chip from '@material-ui/core/Chip';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CandidateSkillsService from '../services/candidateSkillsService'

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({

        root:{
                margin:16,
                display: 'flex',
                justifyContent:'center'
        },
        chips:{
                padding: 8,
                marginRight: 7,
                marginLeft: 7,
                marginTop: 7
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

function CandidateSkillsComponent({candidateId}) {

        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true);
        let candidateSkillsService = new CandidateSkillsService();

        useEffect(() => {
                candidateSkillsService.getByCandidateId(candidateId).then((result) => {
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
                                        YETENEK BİLGİSİ BULUNAMADI
                                </Typography>
                        </div>
                )
        }


        return (
                <div className={classes.root}>
                        {
                                info.map((inf) => (

                                        <Chip className={classes.chips} color="primary" label={inf.skills.skillName} variant="default" />
                                ))
                        }
                </div>
        )
}

export default CandidateSkillsComponent
