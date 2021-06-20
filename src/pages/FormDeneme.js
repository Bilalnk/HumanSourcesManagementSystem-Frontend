import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextField } from '@material-ui/core';
import { useFormik } from "formik";
import { Button } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Label } from 'semantic-ui-react';

function FormDeneme() {

        const validationSchema = Yup.object({
                description: Yup.string().required("Bu alanın doldurulması zorunludur"),
                jobId: Yup.number().required("Bu alanın doldurulması zorunludur"),
        })

        const formik = useFormik({
                initialValues: {
                        description: "dsdas",
                        job: "",

                },
                validationSchema: validationSchema,
                onSubmit: (values) => {
                        values.employerId = 4;
                        console.log(values);
                        alert("İş ilanı eklendi personelin onayı ardından listelenecektir");

                },
                onChange: (values) => {

                        console.log(values)

                }
        });

        const handleChanges = (value, fieldName) => {
                formik.setFieldValue(fieldName, value);
        }

        const jobs = [
                { id: 1, jobsName: "birinci" },
                { id: 2, jobsName: "ikinci" },
        ]

        return (
                <div>


                        <form onSubmit={formik.handleSubmit}>
                                <InputLabel id="demo-simple-select-outlined-label">Job Positions</InputLabel>
                                <TextField

                                        id="description"
                                        label="Job Description"
                                        labelId="demo-simple-select-outlined-label"
                                        variant="outlined"
                                        multiline
                                        rows={4}
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

                                <TextField
                                        select
                                        id="jobId"
                                        label="Course Category"
                                        value={formik.values.job}
                                        onChange={formik.handleChange}
                                        margin="dense"
                                        variant="outlined"
                                        fullWidth
                                >
                                        {jobs.map(option => (
                                                <MenuItem key={option.id} value={option.id}>
                                                        {option.jobsName}
                                                </MenuItem>
                                        ))}
                                </TextField>




                                <Button type="submit">Gönder</Button>
                        </form>


                </div>
        )
}

export default FormDeneme
