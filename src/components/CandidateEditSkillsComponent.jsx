import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core"
import { Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";


import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SkillsService from "../services/skillsService"
import CandidateSkillsService from "../services/candidateSkillsService"


function CandidateEditSkillsComponent({ candidateId, handleEdit }) {

        let skillsService = new SkillsService()
        let candidateSkillsService = new CandidateSkillsService()

        const [allSkills, setAllSkills] = useState([])

        const EditSchoolInfoSchema = Yup.object().shape({
                skills: Yup.object().nullable().required("Bu alanın doldurulması zorunludur"),

        });

        const formik = useFormik({
                initialValues: {
                        skills: { id: "" },

                },
                validationSchema: EditSchoolInfoSchema,
                onSubmit: (values) => {

                        values.candidates = { id: candidateId }

                        candidateSkillsService.add(values).then((result) => {

                                if(result.data.success){
                                        toast.success(result.data.message)
                                        handleEdit()
                                }else{
                                        toast.error(result.data.message)
                                }
                        })

                },
        });

        useEffect(() => {

                skillsService.getAll().then((result) => {
                        setAllSkills(result.data.data)
                        console.log(allSkills)
                })

        }, [])


        const skillsOptions = allSkills.map((skill, index) => ({
                key: index,
                text: skill.skillName,
                value: skill.id,

        }));

        const handleChangeSemantic = (value, fieldName) => {
                formik.setFieldValue(fieldName, value);
        }

        return (

                <div style={{ minHeight: 150 }}>

                        <Form onSubmit={formik.handleSubmit} >


                                {/* <Form.Field >
                                        <label >Yetenek </label>
                                        <Dropdown
                                                clearable
                                                item
                                                style={{ width: "100%" }}
                                                placeholder="Yetenek"
                                                search
                                                selection
                                                onChange={(event, data) =>
                                                        handleChangeSemantic(data.value, "skills.id")
                                                }
                                                onBlur={formik.onBlur}
                                                id="skills"
                                                value={formik.values.skills.text}
                                                options={skillsOptions}
                                        />
                                        {formik.errors.skills && formik.touched.skills && (
                                                <div className={"ui pointing red basic label"}>
                                                        {formik.errors.skills}
                                                </div>
                                        )}
                                </Form.Field> */}

                                <FormControl variant="outlined" >

                                        <div style={{ width: 900 - 30 }}>
                                                <Select

                                                        style={{ width: '100%' }}
                                                        id="skills"
                                                        value={formik.values.skills.text}
                                                        onChange={(event, data) =>
                                                                handleChangeSemantic(event.target.value, "skills.id")
                                                        }
                                                        label="Age"

                                                >
                                                        <MenuItem value="">
                                                                <em>None</em>
                                                        </MenuItem>


                                                        {skillsOptions.map((skill) =>
                                                                <MenuItem value={skill.value}>{skill.text}</MenuItem>
                                                        )}

                                                </Select>
                                        </div>
                                </FormControl>


                                <div style={{ display: "flex", justifyContent: "flex-end" }}>

                                        <Button
                                                type="Submit"
                                                color="primary"
                                        >
                                                kaydet
                                        </Button>
                                </div>
                        </Form>
                </div>
        )
}

export default CandidateEditSkillsComponent
