import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useFormik } from "formik";

function FormDeneme() {

        const validationSchema = Yup.object().shape({
                description: Yup.string().required("Bu alanın doldurulması zorunludur"),
        })

        const formik = useFormik({
                initialValues: {
                        description: "",

                },
                validationSchema: validationSchema,
                onSubmit: (values) => {
                        values.employerId = 4;
                        console.log(values);
                        alert("İş ilanı eklendi personelin onayı ardından listelenecektir");

                },
        });

        const handleChanges = (value, fieldName) => {
                formik.setFieldValue(fieldName, value);
        }


        return (
                <div>


                        <form onSubmit={formik.handleSubmit}>
                                <TextField

                                        label="Job Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        error={ Boolean(formik.errors.description).toString()}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                />
                                {
                                        formik.errors.description && formik.touched.description && (
                                                <div >
                                                        {formik.errors.description}
                                                </div>
                                        )
                                }
                        </form>


                </div>
        )
}

export default FormDeneme
