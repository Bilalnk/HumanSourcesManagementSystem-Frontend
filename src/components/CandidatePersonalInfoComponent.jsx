import { toast } from 'react-toastify'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { ExternalLink } from 'react-external-link';
import React, { useState, useEffect, createRef } from 'react'
import { LinkedIn as LinkedinIcon, GitHub as GithubIcon } from '@material-ui/icons';
import {
        Button,
        Typography,
        Divider,
        IconButton,
        CardHeader,
        Card,
        Avatar,
        Backdrop,
        CircularProgress,
        makeStyles
}from '@material-ui/core'

import CandidatePersonaEditComponent from './CandidatePersonaEditComponent';

import CandidatesService from '../services/candidatesService';
import CandidatePhotoService from '../services/candidatePhotoService'
import CandidateLinksService from '../services/candidateLinksService';



const useStyles = makeStyles((theme) => ({


        root: {

                maxWidth: 900,
                minWidth: 900,
                marginBottom: 20,
                padding: 15

        },
        rootInfo: {

                display: 'flex',
                justifyContent: 'space-between'

        },
        leftPart: {
                display: 'flex',
        },
        rightPart: {

        },
        large: {
                marginRight: 25,
                width: theme.spacing(20),
                height: theme.spacing(20),
                // '&:hover': {
                //         backgroundImage: `url(https://i.stack.imgur.com/BrYfc.jpg?s=32&g=1)`

                // }
        },
        persona: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly'
        },
        middlePart: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 500
        },
        buttonGroup: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',

        },
        backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
        },
}));

function CandidatePersonalInfoComponent({ candidateId }) {

        let candidatePhotoService = new CandidatePhotoService()
        let candidateService = new CandidatesService()
        let candidateLinksService = new CandidateLinksService()

        const classes = useStyles();
        const [info, setInfo] = useState([])
        const [candidate, setCandidate] = useState([])
        const [candidateLinks, setCandidateLinks] = useState([])

        const [isLoading, setLoading] = useState(true);
        const [isClicked, setCliCked] = useState(false)

        const [openProgress, setOpenProgress] = React.useState(false);

        const [image, _setImage] = useState(null)
        const [imageUpdated, setImageUpdated] = useState(false)
        const inputFileRef = createRef(null);

        const handleEdit = () => {
                setCliCked(!isClicked)
        }

        const handleOnChange = (event) => {

                const newImage = event.target?.files?.[0];


                if (newImage) {
                        console.log(newImage.size)

                        newImage.size <= 2097152 ? setImage(newImage) :
                                toast.error("Resim Boyutu en fazla 2 Mb olmalı")

                }
        };

        const handleClick = (event) => {
                if (image) {
                        event.preventDefault();
                        setImage(null);
                }
        };

        const setImage = (newImage) => {
                if (image) {
                        cleanup();
                }
                _setImage(newImage);
        };

        const cleanup = () => {
                URL.revokeObjectURL(image)
                inputFileRef.current.value = null;
        };

        const handleImageSave = () => {
                setOpenProgress(true)
                candidatePhotoService.fileUpload(candidateId, image).then((result) => {

                        if (result.data.success) {
                                toast.success(result.data.message)
                                _setImage(null);
                        } else {

                                toast.error(result.data.message)
                        }
                        setOpenProgress(false)

                })
        }



        useEffect(() => {
                setImageUpdated(false)
                candidatePhotoService.getById(candidateId)
                        .then((result) => {
                                setInfo(result.data.data)
                                setLoading(false)
                        })

                candidateService.getById(candidateId)
                        .then((result) => setCandidate(result.data.data))

                candidateLinksService.getDtoByCandidateId(candidateId)
                        .then((result) => {
                                setCandidateLinks(result.data.data)
                        })


        }, [isClicked | openProgress])

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


                <Card className={classes.root} >

                        <Backdrop className={classes.backdrop} open={openProgress} >
                                <CircularProgress color="inherit" />
                        </Backdrop>



                        <div
                                className={classes.rootInfo}
                        >

                                {isClicked ?
                                        <CandidatePersonaEditComponent handleEdit={handleEdit} candidateId={candidateId} />
                                        :

                                        <div className={classes.leftPart} >

                                                <div>
                                                        <Avatar alt={info[0].candidates.firstName} src={image ? URL.createObjectURL(image) : info[0].photoUrl == undefined ? null : info[0].photoUrl} className={classes.large}>

                                                        </Avatar>


                                                        <input type="file"
                                                                accept="image/*"
                                                                hidden
                                                                ref={inputFileRef}
                                                                id="avatar-image-upload"
                                                                onChange={handleOnChange}
                                                                onClick={handleOnChange}
                                                        ></input>

                                                        <label htmlFor="avatar-image-upload" >
                                                                <Button
                                                                        // style={{ marginLeft: -54, marginBottom: -50, marginRight: 20 }}

                                                                        color="primary"
                                                                        component="span"
                                                                        mb={2}
                                                                        onClick={handleClick}
                                                                >
                                                                        {image ? <CloseIcon mr={2} /> : <EditIcon mr={2} />}
                                                                        {image ? "Temizle" : "Fotoğrafı Değiştir"}
                                                                </Button>
                                                        </label>

                                                        {image ? <Button
                                                                // style={{ marginLeft: -54, marginBottom: -50, marginRight: 20 }}

                                                                color="primary"
                                                                component="span"
                                                                mb={2}
                                                                onClick={() => (
                                                                        handleImageSave(),
                                                                        setImageUpdated(true)
                                                                )
                                                                }
                                                        >
                                                                Yükle
                                                        </Button> : null}
                                                </div>

                                                <div className={classes.middlePart}>
                                                        <div className={classes.persona}>
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
                                                                        {info[0].candidates.bod.substring(0, 10)}
                                                                </Typography>

                                                                <Typography
                                                                        variant="h6"
                                                                        component="h2"
                                                                >
                                                                        {info[0].candidates.email}
                                                                </Typography>
                                                        </div>
                                                        <div className={classes.buttonGroup}>

                                                                {candidateLinks.map(link => (

                                                                        <ExternalLink href={link.link}>

                                                                                <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                >
                                                                                        {link.linkType == "Github" ?
                                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                        <GithubIcon
                                                                                                                style={{ marginRight: 15 }} />
                                                                                                        {link.linkType}
                                                                                                </div>
                                                                                                :
                                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                                        <LinkedinIcon
                                                                                                                style={{ marginRight: 15 }}

                                                                                                        />

                                                                                                        {link.linkType}
                                                                                                </div>}

                                                                                </Button>
                                                                        </ExternalLink>
                                                                ))}
                                                        </div>
                                                </div>
                                        </div>
                                }


                                <div className={classes.rightPart}>
                                        {isClicked ? <div>
                                                <IconButton aria-label="settings" onClick={(key) => handleEdit()}>
                                                        <CloseIcon />

                                                </IconButton>

                                                <IconButton aria-label="settings" onClick={(e) => console.log("save")}>
                                                        <SaveIcon />
                                                </IconButton>

                                        </div> : <IconButton aria-label="settings" onClick={(e) => handleEdit()}>
                                                <EditIcon />

                                        </IconButton>}
                                </div>
                        </div>

                </Card >

        )
}

export default CandidatePersonalInfoComponent
