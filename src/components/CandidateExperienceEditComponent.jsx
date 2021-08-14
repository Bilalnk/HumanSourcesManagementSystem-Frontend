import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core"
import { Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import JobPositionService from "../services/jobPositionService";
import ExperienceService from "../services/experienceService";

const useStyles = makeStyles({
        root: {
                display: 'flex',
                justifyContent: 'space-around',
                padding: 8
        },
        field: {
                padding: 15
        },
        group: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 25
        }

})


function CandidateExperienceEditComponent({ candidateId, handleEdit }) {

        const classes = useStyles()

        let jobPositionService = new JobPositionService()
        let candidateExperienceService = new ExperienceService()

        const [positions, setPositions] = useState([])

        const EditSchoolInfoSchema = Yup.object().shape({
                jobPositions: Yup.object().nullable().required("Bu alanın doldurulması zorunludur"),
                workPlace: Yup.string().nullable().required("Bu alanın doldurulması zorunludur"),
                startingDate: Yup.date().nullable().required("Bu alanın doldurulması zorunludur"),
                departureDate: Yup.date().nullable().required("Bu alanın doldurulması zorunludur"),

        });

        const formik = useFormik({
                initialValues: {
                        workPlace: "",
                        jobPositions: { id: "" },
                        startingDate: "",
                        departureDate: ""

                },
                validationSchema: EditSchoolInfoSchema,
                onSubmit: (values) => {

                        values.candidates = { id: candidateId }
                        console.log(values)

                        candidateExperienceService.add(values).then((result) => {
                                console.log(result.data)
                                if (result.data.success) {
                                        toast.success("Eklendi")
                                        handleEdit()

                                } else {
                                        toast.error(result.data.message)
                                }
                        }
                        )

                       
                },
        });

        useEffect(() => {

                jobPositionService.getAll().then((result) => {
                        setPositions(result.data.data)
                })

        }, []);


        const positionOption = positions.map((position, index) => ({
                key: index,
                text: position.position,
                value: position.id,

        }));


        const handleChangeSemantic = (value, fieldName) => {

                formik.setFieldValue(fieldName, value);
        }

        return (
                <Form onSubmit={formik.handleSubmit}>
                        <div className={classes.root}>
                                <div className={classes.group}>
                                        <Form.Field className={classes.field}>
                                                <label>İş Yeri </label>
                                                <input
                                                        placeholder="İş Yeri"
                                                        error={Boolean(formik.errors.workPlace).toString()}
                                                        value={formik.values.workPlace}
                                                        name="workPlace"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                />
                                                {formik.errors.workPlace && formik.touched.workPlace && (
                                                        <div className={"ui pointing red basic label"}>
                                                                {formik.errors.workPlace}
                                                        </div>
                                                )}
                                        </Form.Field>

                                        <Form.Field className={classes.field}>
                                                <label >Pozisyon </label>
                                                <Dropdown
                                                        clearable
                                                        item
                                                        style={{ width: "100%" }}
                                                        placeholder="Pozisyon"
                                                        search
                                                        selection
                                                        onChange={(event, data) =>
                                                                handleChangeSemantic(data.value, "jobPositions.id")
                                                        }
                                                        onBlur={formik.onBlur}
                                                        id="department"
                                                        value={formik.values.jobPositions.text}
                                                        options={positionOption}
                                                />
                                                {formik.errors.jobPositions && formik.touched.jobPositions && (
                                                        <div className={"ui pointing red basic label"}>
                                                                {formik.errors.jobPositions}
                                                        </div>
                                                )}
                                        </Form.Field>
                                </div>
                                <div className={classes.group}>
                                        <Form.Field className={classes.field}>
                                                <Grid stackable>

                                                        <label >Başlama Tarihi</label>
                                                        <Input
                                                                style={{ width: "100%" }}
                                                                type="date"
                                                                error={Boolean(formik.errors.startingDate)}
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "startingDate")
                                                                }
                                                                value={formik.values.startDstartingDateate}
                                                                onBlur={formik.handleBlur}
                                                                name="startingDate"
                                                        />
                                                        {formik.errors.startingDate && formik.touched.startingDate && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.startingDate}
                                                                </div>
                                                        )}
                                                </Grid>
                                        </Form.Field>

                                        <Form.Field className={classes.field}>
                                                <Grid stackable>

                                                        <label >Bitiş Tarihi</label>
                                                        <Input
                                                                style={{ width: "100%" }}
                                                                type="date"
                                                                error={Boolean(formik.errors.departureDate)}
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "departureDate")
                                                                }
                                                                value={formik.values.departureDate}
                                                                onBlur={formik.handleBlur}
                                                                name="departureDate"
                                                                placeholder="Son başvuru tarihi"
                                                        />
                                                        {formik.errors.departureDate && formik.touched.departureDate && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.departureDate}
                                                                </div>
                                                        )}
                                                </Grid>
                                        </Form.Field>
                                </div>
                        </div >
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>

                                <Button
                                        type="Submit"
                                        color="primary"
                                >
                                        kaydet
                                </Button>
                        </div>
                </Form>
        )
}

export default CandidateExperienceEditComponent
