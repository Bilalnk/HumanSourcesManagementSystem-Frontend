import React, { useState, useEffect } from 'react'
import CandidatePhotoService from '../services/candidatePhotoService'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Card from '@material-ui/core/Card';
import { CardHeader } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { Divider } from "@material-ui/core";
import CandidateEditBiographyComponent from './CandidateEditBiographyComponent';

const useStyles = makeStyles({
        biography: {
                padding: 16
        },
        noInfo: {
                display: 'flex',
                justifyContent: 'center',
                color: '#ff0000',
                padding: 15
        },
        root: {

                maxWidth: 900,
                minWidth: 900,
                marginBottom: 20,
                padding: 15

        },
})


function Biography({ candidateId, handleClose }) {

        let candidatePhotoService = new CandidatePhotoService()
        const classes = useStyles()
        const [info, setInfo] = useState([])
        const [changes, setChanges] = useState("")
        const [isLoading, setLoading] = useState(true)
        const [isClicked, setCliCked] = useState(false)

        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleSave = () => {
                candidatePhotoService.addPreface(candidateId, changes)
                handleEdit()
        }

        const getChanges = (bio) => {

                setChanges(bio)

        }

        useEffect(() => {
                candidatePhotoService.getById(candidateId).then((result) => {
                        setInfo(result.data.data)
                        setLoading(false)
                        handleClose()
                })


        }, [isClicked])

        if (isLoading) {
                return (
                        <Card className={classes.root}>
                                Yükleniyor...
                        </Card>

                )
        }

        if (!info[0].preface) {
                return (
                        <Card className={classes.root}>

                                <CardHeader

                                        action={
                                                <div>
                                                        {isClicked ? <div>
                                                                <IconButton aria-label="settings" onClick={(key) => handleEdit()}>
                                                                        <CloseIcon />

                                                                </IconButton>

                                                                <IconButton aria-label="settings" onClick={(e) => handleSave()}>
                                                                        <SaveIcon />
                                                                </IconButton>

                                                        </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                                <EditIcon />

                                                        </IconButton>}
                                                </div>
                                        }

                                        title="BİYOGRAFİ"
                                >
                                </CardHeader>


                                <Divider />

                               
                                {isClicked ?
                                <CandidateEditBiographyComponent getChanges={getChanges} />
                                :
                                <div className={classes.noInfo}>
                                        <Typography>
                                                BİYOGRAFİ BİLGİSİ BULUNAMADI
                                        </Typography>
                                </div>}

                        </Card>
                )
        }


        if (info.length == 0) {
                return (

                        <Card className={classes.root}>

                                <CardHeader

                                        action={
                                                <div>
                                                        {isClicked ? <div>
                                                                <IconButton aria-label="settings" onClick={(key) => handleEdit()}>
                                                                        <CloseIcon />

                                                                </IconButton>

                                                                <IconButton aria-label="settings" onClick={(e) => handleSave()}>
                                                                        <SaveIcon />
                                                                </IconButton>

                                                        </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                                <EditIcon />

                                                        </IconButton>}
                                                </div>
                                        }

                                        title="BİYOGRAFİ"
                                >
                                </CardHeader>
                                <Divider />

                                {isClicked ?
                                <CandidateEditBiographyComponent getChanges={getChanges} />
                                :
                                <div className={classes.noInfo}>
                                        <Typography>
                                                BİYOGRAFİ BİLGİSİ BULUNAMADI
                                        </Typography>
                                </div>}

                                

                        </Card>


                )
        }

        return (

                <Card className={classes.root}>

                        <CardHeader

                                action={
                                        <div>
                                                {isClicked ? <div>
                                                        <IconButton aria-label="settings" onClick={(key) => handleEdit()}>
                                                                <CloseIcon />

                                                        </IconButton>

                                                        <IconButton aria-label="settings" onClick={(e) => handleSave()}>
                                                                <SaveIcon />
                                                        </IconButton>

                                                </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                        <EditIcon />

                                                </IconButton>}
                                        </div>
                                }

                                title="BİYOGRAFİ"
                        >
                        </CardHeader>


                        <Divider />

                        {isClicked ?
                                <CandidateEditBiographyComponent getChanges={getChanges} />
                                :
                                <Typography
                                        className={classes.biography}
                                >
                                        {info[0].preface}
                                </Typography>}


                </Card>


        )
}

export default Biography
