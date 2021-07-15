import React from 'react'
import { toast } from 'react-toastify';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import { Divider } from "@material-ui/core";
import { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { CardHeader } from "@material-ui/core";
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Close as CloseIcon, Add as AddIcon } from '@material-ui/icons';

import CandidateEditSkillsComponent from './CandidateEditSkillsComponent';

import CandidateSkillsService from '../services/candidateSkillsService'

const useStyles = makeStyles((theme) => ({

        root: {

                maxWidth: 900,
                minWidth: 900,
                marginBottom: 20,
                padding: 15

        },
        rootContent: {
                margin: 16,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '& > *': {
                        margin: theme.spacing(0.5),
                },
        },
        chips: {
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

function CandidateSkillsComponent({ candidateId }) {

        let candidateSkillsService = new CandidateSkillsService();

        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [isLoading, setLoading] = useState(true);
        const [isClicked, setCliCked] = useState(false)
        const [isChanged, setChanged] = useState(false)


        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleDelete = (id) => {
                candidateSkillsService.delete(id).then((result) => {
                        if (result.data.success) {
                                toast.success(result.data.message)
                        } else {
                                toast.error(result.data.message)
                        }
                        console.log(result.data)
                })
        };


        useEffect(() => {
                setChanged(false)
                candidateSkillsService.getByCandidateId(candidateId).then((result) => {
                        setInfo(result.data.data)
                        setLoading(false)
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

                                title="YETENEKLER"
                        >
                        </CardHeader>
                        <Divider />

                        {isClicked ?
                                <CandidateEditSkillsComponent handleEdit={handleEdit} candidateId={candidateId} />
                                :

                                <div>

                                        {info.length == 0 ?
                                                <div className={classes.noInfo}>
                                                        <Typography>
                                                                YETENEK BİLGİSİ BULUNAMADI
                                                        </Typography>
                                                </div>
                                                :
                                                <div className={classes.rootContent}>
                                                        {
                                                                info.map((inf) => (

                                                                        <Chip className={classes.chips} color="primary" onDelete={() => {
                                                                                handleDelete(inf.id)
                                                                                setChanged(true)
                                                                        }}
                                                                                label={inf.skills.skillName}
                                                                                variant="default" />
                                                                ))
                                                        }
                                                </div>
                                        }
                                </div>
                        }

                </Card>


        )
}

export default CandidateSkillsComponent
