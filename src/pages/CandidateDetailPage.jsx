import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { useState } from "react";
import { Typography, Divider } from "@material-ui/core";

import CandidateSchoolInfoComponent from '../components/CandidateSchoolInfoComponent';
import CandidatesService from '../services/candidatesService'
import CandidateExperienceComponent from "../components/CandidateExperienceComponent";
import CandidateSkillsComponent from "../components/CandidateSkillsComponent";
import CandidateLanguagesComponent from "../components/CandidateLanguagesComponent";
import CandidatePersonalInfoComponent from "../components/CandidatePersonalInfoComponent";
import CandidateBiographyComponent from "../components/CandidateBiographyComponent"
import CandidateEditBiographyComponent from "../components/CandidateEditBiographyComponent";

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
        }
}));




function CandidateDetailPage() {

        let candidatesService = new CandidatesService()
        const classes = useStyles();
        const { candidateId } = useParams();
     


        return (
                <div className={classes.rootOfRoot}>



                        <Card className={classes.root} >
                                <CandidatePersonalInfoComponent candidateId={candidateId} />
                        </Card>

                        <CandidateBiographyComponent candidateId={candidateId} />

                        <Card className={classes.root}>
                                <CardHeader

                                        action={
                                              

                                                <IconButton aria-label="settings" onClick={(e) =>console.log(e)}>
                                                       <EditIcon />

                                                </IconButton>
                                    
                                        }

                                        title="OKUL BİLGİSİ"
                                >
                                </CardHeader>
                                <Divider />
                                <CandidateSchoolInfoComponent candidateId={candidateId} />

                        </Card>


                        
                        <CandidateLanguagesComponent candidateId={candidateId} />


                        <Card className={classes.root}>
                                <CardHeader

                                        action={
                                                <IconButton aria-label="settings" onClick={() => console.log("tıklandı")}>
                                                        <EditIcon />
                                                </IconButton>
                                        }

                                        title="DENEYİM"
                                >
                                </CardHeader>
                                <Divider />
                                <CandidateExperienceComponent candidateId={candidateId} />
                        </Card>

                        <Card className={classes.root}>
                                <CardHeader

                                        action={
                                                <IconButton aria-label="settings" onClick={() => console.log("tıklandı")}>
                                                        <EditIcon />
                                                </IconButton>
                                        }

                                        title="YETENEKLER"
                                >
                                </CardHeader>
                                <Divider />
                                <CandidateSkillsComponent candidateId={candidateId} />
                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='left'
                                        variant="h6"
                                        component="h2"
                                >BAĞLANTILAR
                                </Typography>
                                <Divider />
                        </Card>


                </div>

        )
}

export default CandidateDetailPage
