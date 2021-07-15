import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { toast } from 'react-toastify';

import { Container } from 'semantic-ui-react';
import Card from '@material-ui/core/Card';
import { Link, Typography } from '@material-ui/core';
import { CardMedia, CardActionArea } from '@material-ui/core';
import { makeStyles, Button } from '@material-ui/core';
import UserService from '../services/userService';
import HrmsTextInput from '../utilities/customFromControl/HrmsTextInput';
import { CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router';



import { useDispatch } from 'react-redux'
import { login } from "../store/actions/userActions"
import {addUserRole} from "../store/actions/userRoleActions"

const useStyles = makeStyles({

        root: {
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                padding: '1em',
                justifyContent: 'center',
                background: 'linear-gradient(45deg, #aaff 30%, #FF8E53 90%)',
                alignItems: 'center',
        },
        card: {

                maxWidth: 450,
                minWidth: 435,

                borderRadius: 10
        },
        media: {
                height: 200,

        },
        mediaText: {

                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 32,
                fontWeight: 'bold',
                color: 'white'
        },
        form: {

                marginTop: 25,
                padding: 20,
        },
        frontMedia: {
                height: '100%',
                width: '100%',
                backdropFilter: "blur(1px)",
                backgroundColor: 'rgba(0,0,30,0.4)'
        },

        createAcount: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10
        },
        loadingProgess: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
        }

})

function Login() {

        let userService = new UserService()
        const classes = useStyles()
        const history = useHistory()
        const [isLoading, setLoading] = useState(false)

        const SignInSchema = Yup.object({

                email: Yup.string().email("Geçerli bir email adresi girin").required("Bu alanın doldurulması zorunludur."),
                password: Yup.string().required("Bu alan zorunludur").min(6, "6 karakterden az olamaz")
        });

        const initialValues = {
                email: "",
                password: "",
        }

        const dispatch = useDispatch() // bir fonksiyon çağırmak için kullanılmaktadır.


        const handleSubmit = (values) => {
                setLoading(true)

                userService.getLoggedinUser(values.email, values.password)
                        .then((result) => {
                                dispatch(login(result.data.data))
                                dispatch(addUserRole(result.data.message))
                                setLoading(false)
                                if (result.data.success !== false) {
                                        toast.success("Giriş Başarılı")
                                        setTimeout(function () {
                                                history.push("/")
                                        }, 800);
                                } else {
                                        toast.error("Email veya parola yanlış")
                                }

                        })

                // userService.login(values.email, values.password)
                //         .then((result) => {
                //                 console.log(result.data)
                //                 setLoading(false)
                //                 console.log(result.data.success)
                //                 if (result.data.success !== false) {
                //                         toast.success("Giriş Başarılı")
                //                         setTimeout(function () {
                //                                 history.push("/")
                //                         }, 800);
                //                 } else {
                //                         toast.error("Email veya parola yanlış")
                //                 }
                //         })
        }


        return (

                <Container>
                        <div className={classes.root}>


                                <Card elevation={3} className={classes.card} >
                                        <CardActionArea>
                                                <CardMedia
                                                        className={classes.media}
                                                        image="https://img5.goodfon.com/wallpaper/nbig/e/5b/abstraktsiia-geometriia-krugi-sinii-fon-geometrical-backgrou.jpg"
                                                        title="Contemplative Reptile"
                                                >
                                                        <div className={classes.frontMedia}>
                                                                <Typography className={classes.mediaText}>
                                                                        HRMS GİRİŞ
                                                                </Typography>
                                                        </div>
                                                </CardMedia>
                                        </CardActionArea>

                                        <Formik
                                                initialValues={initialValues}
                                                validationSchema={SignInSchema}
                                                onSubmit={(values) => {
                                                        handleSubmit(values)
                                                }}

                                        >
                                                {isLoading ?
                                                        <div className={classes.loadingProgess}>
                                                                <CircularProgress color="secondary" classes={{ marginRight: 55 }} />
                                                        </div>
                                                        :
                                                        <div className={classes.form}>
                                                                <Form className="ui form">
                                                                        <HrmsTextInput name="email" placeHolder="email" />
                                                                        <HrmsTextInput name="password" type="password" placeHolder="password" />
                                                                        <Button
                                                                                type="submit"
                                                                                variant="contained"
                                                                                fullWidth
                                                                                color="primary"
                                                                        >
                                                                                Giriş Yap
                                                                        </Button>
                                                                </Form>

                                                        </div>}


                                        </Formik>

                                        <Link href="/" className={classes.createAcount}>
                                                Hesabın yok mu? Hemen hesap aç.
                                        </Link>

                                </Card>
                        </div>
                </Container>

        )
}


export default Login
