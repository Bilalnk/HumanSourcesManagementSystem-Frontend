import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';

import CandidateSchoolInfoComponent from '../components/CandidateSchoolInfoComponent';
import CandidatesService from '../services/candidatesService'
import CandidateExperienceComponent from "../components/CandidateExperienceComponent";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

        rootOfRoot: {
                marginLeft: 35
        },
        root: {

                maxWidth: 1000,
                marginBottom: 20,
                padding: 15

        },
        large: {
                width: theme.spacing(20),
                height: theme.spacing(20),
        },
}));




function CandidateDetailPage() {

        let candidatesService = new CandidatesService()
        const classes = useStyles();
        const { candidateId } = useParams();


        return (
                <div className={classes.rootOfRoot}>

                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />

                        <Card className={classes.root}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
                                candidate detail {candidateId}

                                adı soyadı bod identity number email
                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='center'
                                        variant="h6"
                                        component="h2"
                                >OKUL BİLGİSİ
                                </Typography>
                                <Divider />
                                <CandidateSchoolInfoComponent candidateId={candidateId} />

                        </Card>



                        <Card className={classes.root}>
                                <Typography
                                        align='center'
                                        variant="h6"
                                        component="h2"
                                >DİL BİLGİSİ
                                </Typography>
                                <Divider />

                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='center'
                                        variant="h6"
                                        component="h2"
                                >DENEYİM
                                </Typography>
                                <Divider />
                                <CandidateExperienceComponent candidateId={candidateId} />
                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='center'
                                        variant="h6"
                                        component="h2"
                                >BAĞLANTILAR
                                </Typography>
                                <Divider />
                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='center'
                                        variant="h6"
                                        component="h2"
                                >YETENEKLER
                                </Typography>
                                <Divider />
                                <Chip label="Basic" variant="outlined" />
                                <Chip label="Basic" variant="outlined" />
                                <Chip label="Basic" variant="outlined" />
                                <Chip label="Basic" variant="outlined" />
                                <Chip label="Basic" variant="outlined" />
                        </Card>

                </div>

        )
}

export default CandidateDetailPage
