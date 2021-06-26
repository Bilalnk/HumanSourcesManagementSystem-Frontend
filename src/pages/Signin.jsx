import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"

import { Form, TextArea, Input, Label } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Card from '@material-ui/core/Card';
import { Link, Typography } from '@material-ui/core';
import { CardMedia, CardActionArea, CardContent } from '@material-ui/core';
import { makeStyles, Button } from '@material-ui/core';
import { maxHeight } from '@material-ui/system';
import { useHistory } from "react-router-dom";
import {Button as SButton} from "semantic-ui-react"
import UserService from '../services/userService';

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
                minWidth: 350,

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
        }

})

function Signin() {

        let userService = new UserService()
        const classes = useStyles()
        const history = useHistory()
        const SignInSchema = Yup.object().shape({

                email: Yup.string().email("Geçerli bir email adresi girin").required("Bu alanın doldurulması zorunludur."),
                password: Yup.string().required("Bu alan zorunludur").min(6, "6 karakterden az olamaz")
        });

        const formik = useFormik({
                initialValues: {
                        email: "",
                        password: "",
                },
                validationSchema: SignInSchema,
                onSubmit: (values) => {
                        userService.login(values.email, values.password).then((result) => console.log(result.data))
                },
        });

        const handleSubmit = (value, fieldname) => {
                formik.setFieldValue(fieldname, value)
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

                                        <Form onSubmit={formik.handleSubmit} className={classes.form}>


                                                <Form.Field>
                                                        <label>Email</label>
                                                        <Input
                                                                placeholder="Email"
                                                                error={Boolean(formik.errors.email).toString}
                                                                value={formik.values.email}
                                                                name="email"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                        />
                                                        {formik.errors.email && formik.touched.email && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.email}
                                                                </div>
                                                        )}

                                                </Form.Field>

                                                <Form.Field>
                                                        <label>Password</label>
                                                        <Input
                                                                type="password"
                                                                placeholder="Password"
                                                                error={Boolean(formik.errors.password).toString}
                                                                value={formik.values.password}
                                                                name="password"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                        />
                                                        {formik.errors.password && formik.touched.password && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.password}
                                                                </div>
                                                        )}
                                                </Form.Field>

                                                {/* <SButton
                                                        content="Ekle"
                                                        labelPosition="left"
                                                        icon="add"
                                                        positive
                                                        type="submit"
                                                        style={{ marginLeft: "20px" }}
                                                >sad</SButton> */}


                                                <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        fullWidth
                                                >
                                                        Giriş Yap
                                                </Button>

                                        </Form>
                                        <Link href="/" className={classes.createAcount}>
                                                Hesabın yok mu? Hemen hesap aç.
                                        </Link>

                                </Card>
                        </div>
                </Container>

        )
}


export default Signin
