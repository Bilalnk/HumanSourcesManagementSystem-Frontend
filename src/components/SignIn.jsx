import React from "react";
import DropDownMenu from "./DropDownMenu";
import { Avatar, makeStyles } from "@material-ui/core";

import { useEffect } from "react";

import CandidatePhotoService from "../services/candidatePhotoService"
import { currentUser } from "../store/initialValues/currentUser";

import { useSelector } from 'react-redux'

import { useState } from "react";

const useStyles = makeStyles((theme) => {
        return {
                avatar: {
                        marginLeft: theme.spacing(2),
                },
                row: {
                        display: 'flex'
                }
        };
});

function SignIn({ signOut, user }) {
        const classes = useStyles();

        const [photo, setPhoto] = useState("")
        const [name, setName] = useState("")

        useEffect(() => {
                let candidatePhotoService = new CandidatePhotoService()
                
                candidatePhotoService.getById(user.user.id).then((result) => {
        
                        if (result.data.success) {

                                setPhoto(result.data.data[0].photoUrl ?  result.data.data[0].photoUrl : null)
                                console.log(user.user)
                                setName(result.data.data[0].candidates.firstName ? result.data.data[0].candidates.firstName + " " + result.data.data[0].candidates.lastName : null)

                        }

                        if(user.user.companyName){
                                setName(user.user.companyName)
                        }else if(user.user.firstName){
                                setName(user.user.firstName + " " + user.user.lastName)
                        }
                })
        }, [])

        return (
                <div className={classes.row}>
                        <DropDownMenu name={name} signOut={signOut} />

                        {photo ?
                                <Avatar
                                        src={photo}
                                        className={classes.avatar}
                                />
                                :
                                null
                        }
                </div>
        );
}

export default SignIn;
