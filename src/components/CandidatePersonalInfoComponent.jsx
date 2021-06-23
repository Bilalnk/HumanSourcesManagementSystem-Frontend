import React, { useState, useEffect } from 'react'

import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import CandidatePhotoService from '../services/candidatePhotoService'
import CandidatesService from '../services/candidatesService';


const useStyles = makeStyles((theme) => ({


        root: {

                display: 'flex'

        },
        large: {
                marginRight: 15,
                width: theme.spacing(20),
                height: theme.spacing(20),
        },
        persona: {
                display:'flex',
                flexDirection:'column',
                justifyContent: 'space-evenly'
        }
}));

function CandidatePersonalInfoComponent({ candidateId }) {

        let candidatePhotoService = new CandidatePhotoService()
        let candidateService = new CandidatesService()
        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [candidate, setCandidate] = useState([])
        const [isLoading, setLoading] = useState(true);

        useEffect(() => {

                candidatePhotoService.getById(candidateId)
                        .then((result) => {
                                setInfo(result.data.data)
                                setLoading(false)
                        })

                candidateService.getById(candidateId)
                .then((result) => setCandidate(result.data.data))


        }, [])

        if (isLoading) {
                return (
                        <div className={classes.loadingRoot}>
                                Yükleniyor...
                        </div>
                );
        }

        if (!info) {
                return (
                        <div>

                                Hata oluştu...
                        </div>
                );
        }

        if (info.length == 0) {
                return (
                        <div
                                className={classes.root}
                        >
                                <Avatar alt="Remy Sharp" className={classes.large} />

                                <Typography
                                        variant="h6"
                                        component="h2"
                                >
                                        {candidate.firstName} {candidate.lastName}
                                </Typography>
                        </div>
                );
        }

        return (



                <div
                        className={classes.root}
                >
                        <Avatar alt="Remy Sharp" src={info[0].photoUrl == undefined ? null : info[0].photoUrl} className={classes.large} />

                        <div
                                className={classes.persona}
                        >

                                <Typography
                                        variant="h6"
                                        component="h2"
                                >
                                        {info[0].candidates.firstName} {info[0].candidates.lastName}
                                </Typography>
                                
                                <Typography
                                        variant="h6"
                                        component="h2"
                                >
                                        {info[0].candidates.bod.substring(0,10)}
                                </Typography>

                                <Typography
                                        variant="h6"
                                        component="h2"
                                >
                                        {info[0].candidates.email}
                                </Typography>
                        </div>
                </div>
        )
}

export default CandidatePersonalInfoComponent
