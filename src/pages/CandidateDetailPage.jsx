import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import { Typography, Divider } from "@material-ui/core";


import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import CandidateSchoolInfoComponent from '../components/CandidateSchoolInfoComponent';
import CandidatesService from '../services/candidatesService'
import CandidateExperienceComponent from "../components/CandidateExperienceComponent";
import CandidateSkillsComponent from "../components/CandidateSkillsComponent";
import CandidateLanguagesComponent from "../components/CandidateLanguagesComponent";
import CandidatePersonalInfoComponent from "../components/CandidatePersonalInfoComponent";
import CandidateBiographyComponent from "../components/CandidateBiographyComponent"

const useStyles = makeStyles((theme) => ({

        rootOfRoot: {
                marginLeft: 65,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
        },
        root: {

                maxWidth: 900,
                minWidth: 900,
                marginBottom: 20,
                padding: 15

        },
        large: {
                width: theme.spacing(20),
                height: theme.spacing(20),
        },
        divRow: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
        },
        backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
        },
}));




function CandidateDetailPage() {

        const classes = useStyles();
        const { candidateId } = useParams();
        let i = 0;
        const [open, setOpen] = React.useState(false);

        const handleClose = () => {
                i++;
                if (i === 4) {
                        setOpen(false);
                }
        };
        const handleToggle = () => {
                setOpen(!open);
        };

        useEffect(() => {
                handleToggle()
        }, [])



        return (

                <div className={classes.rootOfRoot}>

                        <Backdrop className={classes.backdrop} open={open} >
                                <CircularProgress color="inherit" />
                        </Backdrop>
                        
                        <CandidatePersonalInfoComponent candidateId={candidateId} />
                       
                        <CandidateBiographyComponent handleClose={handleClose} candidateId={candidateId} />

                        <CandidateSchoolInfoComponent handleClose={handleClose} candidateId={candidateId} />

                        <CandidateLanguagesComponent handleClose={handleClose} candidateId={candidateId} />

                        <CandidateExperienceComponent handleClose={handleClose} candidateId={candidateId} />

                        <CandidateSkillsComponent candidateId={candidateId} />

                </div>

        )
}

export default CandidateDetailPage
