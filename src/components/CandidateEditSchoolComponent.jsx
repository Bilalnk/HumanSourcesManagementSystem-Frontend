import React, { useEffect, useState } from "react";
import SchoolService from "../services/schoolService"
import SchoolDepartmentService from "../services/schoolDepartmentService"
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core"
import { Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import CandidateSchoolInfoService from "../services/candidateSchoolInfoService";

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

function CandidateEditSchoolComponent({ candidateId, handleEdit }) {

        const classes = useStyles()

        let schoolService = new SchoolService()
        let schoolDepartmentService = new SchoolDepartmentService()
        let candidateSchoolInfoService = new CandidateSchoolInfoService()

        const [schools, setSchools] = useState([])
        const [departments, setDepartments] = useState([])

        const EditSchoolInfoSchema = Yup.object().shape({
                school: Yup.object().nullable().required("Bu alanın doldurulması zorunludur"),
                department: Yup.object().nullable().required("Bu alanın doldurulması zorunludur"),
                startDate: Yup.date().nullable().required("Bu alanın doldurulması zorunludur"),
                endDate: Yup.date().nullable().required("Bu alanın doldurulması zorunludur"),

        });

        const formik = useFormik({
                initialValues: {
                        school: "",
                        department: { id: "" },
                        startDate: "",
                        endDate: ""

                },
                validationSchema: EditSchoolInfoSchema,
                onSubmit: (values) => {
                        values.candidates = { id: candidateId }

                        const candidateSchool = {
                                candidates: { id: parseInt(candidateId) },
                                dateOfFinish: values.endDate,
                                dateOfStart: values.startDate,
                                schoolDepartment: { id: values.department.schoolDepartmentId },
                        }

                        candidateSchoolInfoService.add(candidateSchool).then((result) => {
                                console.log(result.data)
                                if(result.data.success){
                                        toast.success("Eklendi")
                                        handleEdit()

                                }else{
                                        toast.error(result.data.message)
                                }
                        })
                },
        });

        useEffect(() => {

                schoolService.getAll().then((result) => setSchools(result.data.data));

        }, []);

        const getDepartments = (schoolId) => {

                schoolDepartmentService.getBySchoolId(schoolId).then((result) => {
                        setDepartments(result.data.data)

                })
        }

        const schoolOption = schools.map((school, index) => ({
                key: index,
                text: school.schoolName,
                value: school.id,

        }));

        const departmentOption = departments.map((department, index) => ({
                key: index,
                text: department.department,
                value: department.schoolDepartmentId,

        }));

        const handleChangeSemantic = (value, fieldName) => {
                if(fieldName === "school.id" && !value){

                        console.log(fieldName)
                        setDepartments([])
                }
                formik.setFieldValue(fieldName, value);
        }

        return (
                <Form onSubmit={formik.handleSubmit}>
                        <div className={classes.root}>
                                <div className={classes.group}>
                                        <Form.Field className={classes.field}>
                                                <label>Okul </label>
                                                <Dropdown
                                                        clearable
                                                        item
                                                        placeholder="Okul"
                                                        search
                                                        fluid
                                                        selection
                                                        onChange={(event, data) => {
                                                                handleChangeSemantic(data.value, "school.id")
                                                                getDepartments(data.value)
                                                        }
                                                        }
                                                        onBlur={formik.onBlur}
                                                        id="school"
                                                        value={formik.values.school.text}
                                                        options={schoolOption}
                                                />
                                                {formik.errors.school && formik.touched.school && (
                                                        <div className={"ui pointing red basic label"}>
                                                                {formik.errors.school}
                                                        </div>
                                                )}
                                        </Form.Field>

                                        <Form.Field className={classes.field}>
                                                <label >Bölüm </label>
                                                <Dropdown
                                                        clearable
                                                        item
                                                        style={{ width: "100%" }}
                                                        placeholder="Bölüm"
                                                        search
                                                        selection
                                                        onChange={(event, data) =>
                                                                handleChangeSemantic(data.value, "department.schoolDepartmentId")
                                                        }
                                                        onBlur={formik.onBlur}
                                                        id="department"
                                                        value={formik.values.department.text}
                                                        options={departmentOption}
                                                />
                                                {formik.errors.department && formik.touched.department && (
                                                        <div className={"ui pointing red basic label"}>
                                                                {formik.errors.department}
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
                                                                error={Boolean(formik.errors.startDate)}
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "startDate")
                                                                }
                                                                value={formik.values.startDate}
                                                                onBlur={formik.handleBlur}
                                                                name="startDate"
                                                        />
                                                        {formik.errors.startDate && formik.touched.startDate && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.startDate}
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
                                                                error={Boolean(formik.errors.endDate)}
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "endDate")
                                                                }
                                                                value={formik.values.endDate}
                                                                onBlur={formik.handleBlur}
                                                                name="endDate"
                                                                placeholder="Son başvuru tarihi"
                                                        />
                                                        {formik.errors.endDate && formik.touched.endDate && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.endDate}
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

export default CandidateEditSchoolComponent
