import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CandidateSchoolInfoComponent from '../components/CandidateSchoolInfoComponent';
import CandidatesService from '../services/candidatesService'
import CandidateExperienceComponent from "../components/CandidateExperienceComponent";
import CandidateSkillsComponent from "../components/CandidateSkillsComponent";
import CandidateLanguagesComponent from "../components/CandidateLanguagesComponent";
import CandidatePersonalInfoComponent from "../components/CandidatePersonalInfoComponent";
import CandidateBiographyComponent from  "../components/CandidateBiographyComponent"
import { Typography, Divider } from "@material-ui/core";

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
}));




function CandidateDetailPage() {

        let candidatesService = new CandidatesService()
        const classes = useStyles();
        const { candidateId } = useParams();


        return (
                <div className={classes.rootOfRoot}>

                        

                        <Card className={classes.root} >
                                <CandidatePersonalInfoComponent candidateId={candidateId}/>        

                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='left'
                                        variant="h6"
                                        component="h2"
                                >BİYOGRAFİ
                                </Typography>
                                <Divider />
                                <CandidateBiographyComponent candidateId={candidateId} />

                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='left'
                                        variant="h6"
                                        component="h2"
                                >OKUL BİLGİSİ
                                </Typography>
                                <Divider />
                                <CandidateSchoolInfoComponent candidateId={candidateId} />

                        </Card>


                        <Card className={classes.root}>
                                <Typography
                                        align='left'
                                        variant="h6"
                                        component="h2"
                                >DİL BİLGİSİ
                                </Typography>
                                <Divider />
                                <CandidateLanguagesComponent candidateId={candidateId} />

                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='left'
                                        variant="h6"
                                        component="h2"
                                >DENEYİM
                                </Typography>
                                <Divider />
                                <CandidateExperienceComponent candidateId={candidateId} />
                        </Card>

                        <Card className={classes.root}>
                                <Typography
                                        align='left'
                                        variant="h6"
                                        component="h2"
                                >YETENEKLER
                                </Typography>
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
