import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core"
import { Dropdown, Input, TextArea, Card, Form, Grid, Button as SButton } from "semantic-ui-react";

import CandidatesService from '../services/candidatesService';

function CandidatePersonaEditComponent({ candidateId, handleEdit }) {

        const candidatesService = new CandidatesService()

        const PersonaSchema = Yup.object().shape({
                name: Yup.string().nullable().required("Bu alanın doldurulması zorunludur"),
                surname: Yup.string().nullable().required("Bu alanın doldurulması zorunludur"),
                bod: Yup.date().nullable().required("Bu alanın doldurulması zorunludur"),
                mail: Yup.string().email("Geçerli bir mail adresi girin").nullable().required("Bu alanın doldurulması zorunludur"),

        });

        const formik = useFormik({
                initialValues: {
                        name: "",
                        surname: "",
                        bod: "",
                        mail: "",

                },
                onSubmit: (values) => {



                        values.candidate = candidateId

                        

                        handleSave(values)

                        // candidateSchoolInfoService.add(candidateSchool).then((result) => {
                        //         console.log(result.data)
                        //         if(result.data.success){
                        //                 toast.success("Eklendi")
                        //                 handleEdit()

                        //         }else{
                        //                 toast.error(result.data.message)
                        //         }
                        // })
                },
                validationSchema: PersonaSchema,

        });


        const handleChange = (value, fieldName) => {
                formik.setFieldValue(fieldName, value);
        }

        const handleSave = (values) => {

                const info = {
                        bod: values.bod,
                        candidateId: values.candidate,
                        email: values.mail,
                        firstName: values.name,
                        lastName: values.surname
                }

                candidatesService.update(info).then((result) => {
                        if(result.data.success){
                                toast.success(result.data.message)
                                handleEdit()
                        }else{
                                toast.error(result.data.message)
                        }
                })
        }


        return (
                <div>

                        <Form onSubmit={formik.handleSubmit}>
                                <Form.Field>
                                        <label>İsim</label>
                                        <Input
                                                style={{ width: "100%" }}
                                                type="text"
                                                placeholder="İsim"
                                                value={formik.values.name}
                                                name="name"
                                                // onChange={formik.handleChange}
                                                onChange={(event, data) =>
                                                        handleChange(data.value, "name")
                                                }
                                                onBlur={formik.handleBlur}
                                        >
                                        </Input>
                                        {formik.errors.name && formik.touched.name && (
                                                <div className={"ui pointing red basic label"}>
                                                        {formik.errors.name}
                                                </div>
                                        )}
                                </Form.Field>

                                <Form.Field>
                                        <label>Soyisim</label>
                                        <Input
                                                style={{ width: "100%" }}
                                                type="text"
                                                placeholder="Soyisim"
                                                value={formik.values.surname}
                                                name="surname"
                                                // onChange={formik.handleChange}
                                                onChange={(event, data) =>
                                                        handleChange(data.value, "surname")
                                                }
                                                onBlur={formik.handleBlur}
                                        >
                                        </Input>
                                        {formik.errors.surname && formik.touched.surname && (
                                                <div className={"ui pointing red basic label"}>
                                                        {formik.errors.surname}
                                                </div>
                                        )}
                                </Form.Field>

                                <Form.Field>
                                        <label>Email</label>
                                        <Input
                                                style={{ width: "100%" }}
                                                type="email"
                                                placeholder="Email"
                                                value={formik.values.mail}
                                                name="mail"
                                                // onChange={formik.handleChange}
                                                onChange={(event, data) =>
                                                        handleChange(data.value, "mail")
                                                }
                                                onBlur={formik.handleBlur}
                                        >
                                        </Input>
                                        {formik.errors.mail && formik.touched.mail && (
                                                <div className={"ui pointing red basic label"}>
                                                        {formik.errors.mail}
                                                </div>
                                        )}
                                </Form.Field>

                                <Form.Field >
                                        <Grid stackable>

                                                <label >Doğum Tarihi</label>
                                                <Input
                                                        style={{ width: "100%" }}
                                                        type="date"
                                                        error={Boolean(formik.errors.bod)}
                                                        onChange={(event, data) =>
                                                                handleChange(data.value, "bod")
                                                        }
                                                        value={formik.values.bod}
                                                        onBlur={formik.handleBlur}
                                                        name="bod"
                                                />
                                                {formik.errors.bod && formik.touched.bod && (
                                                        <div className={"ui pointing red basic label"}>
                                                                {formik.errors.bod}
                                                        </div>
                                                )}
                                        </Grid>
                                </Form.Field>


                                <Button
                                        type="submit"
                                        color="primary"
                                >
                                        kaydet
                                </Button>
                        </Form>
                </div>
        )
}

export default CandidatePersonaEditComponent
