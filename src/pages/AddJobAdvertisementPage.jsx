import React from "react";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { Container } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import { format } from "date-fns";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import JobPositionService from "../services/jobPositionService";
import CityService from "../services/cityService";
import WayOfWorkService from "../services/wayOfwork";
import WorkTypeService from "../services/workTypeService";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useFormik } from "formik";

const useStyles = makeStyles((theme) => ({
        title: {
                margin: 10,
                marginBottom: 50,
                display: 'flex',
                justifyContent: 'center',
                fontSize: 24
        },
        field: {
                marginTop: 20,
                marginBottom: 20,
                display: "block",
        },
        btn: {
                "&:hover": {
                        backgroundColor: "#0d47a1",
                        borderColor: "#564345",
                        color: "#ffffff",
                },
        },
        formControl: {
                width: '100%',
                marginBottom: 20

        },
        salaryMax: {
                width: `calc(50% - 10px)`,

        },
        salaryMin: {
                marginRight: theme.spacing(2),
                width: `calc(50% - 10px)`,
        },
        salaryTitle: {
                padding: 20
        }
}));



function AddJobAdvertisementPage() {
        const classes = useStyles();
        const [city, setCity] = useState([]);
        const [jobPositions, setJobPositions] = useState([])
        const [workType, setWorkType] = useState([])
        const [wayOfWork, setWayOfWork] = useState([])


        useEffect(() => {
                let cityService = new CityService();
                let jobPositionService = new JobPositionService();
                let wayOfWorkService = new WayOfWorkService();
                let workTypeService = new WorkTypeService();

                cityService.getAll().then((result) => setCity(result.data.data));
                jobPositionService.getAll().then((result) => setJobPositions(result.data.data)).catch();
                wayOfWorkService.getAll().then((result) => setWayOfWork(result.data.data))
                workTypeService.getAll().then((result => setWorkType(result.data.data)))

        }, []);

        const validationSchema = Yup.object({
                description: Yup.string().required("Bu alanın doldurulması zorunludur"),
                closingDate: Yup.date().required("Bu alanın doldurulması zorunludur").typeError("Geçerli bir tarih girin"),
                maxSalary: Yup.number().min(0, " sıfırdan küçük değer girilemez "),
                minSalary: Yup.number().min(0, " sıfırdan küçük değer girilemez "),
                openPositionCount: Yup.string().required("Bu alanın doldurulması zorunludur").min(1, " en az 1 olmalı"),
                cityId: Yup.number().required("Bu alanın doldurulması zorunludur"),
                employerId: Yup.number().required("Bu alanın doldurulması zorunludur"),
                jobPositionId: Yup.number().required("Bu alanın doldurulması zorunludur"),
                wayOfWorkId: Yup.number().required("Bu alanın doldurulması zorunludur"),
                workTypeId: Yup.number().required("Bu alanın doldurulması zorunludur"),
        })

        const formik = useFormik({
                initialValues: {
                        description: "",
                        publishedDate: "",
                        closingDate: "",
                        maxSalary: "",
                        minSalary: "",
                        openPositionCount: "",
                        city: { id: "" },
                        employer: { id: "" },
                        jobPosition: { id: "" },
                        wayOfWork: { id: "" },
                        workType: { id: "" },

                },
                validationSchema: validationSchema,
                onSubmit: (values) => {
                        values.employerId = 4;
                        console.log(values);
                },

        });



        const handleSubmit = (e) => {
                // e.preventDefault()
                console.log("butona bastın")

        };


        return (
                <Container>
                        <Typography
                                className={classes.title}
                                variant="h6"
                                component="h2"
                                color="textSecondary"
                                gutterBottom
                        >
                                Add a Job Advertisement
                        </Typography>

                        <form onSubmit={formik.handleSubmit}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Job Positions</InputLabel>
                                        <Select
                                                id="jobPositionId"
                                                label="Job Position"
                                                labelId="demo-simple-select-outlined-label"
                                                onBlur={formik.onBlur}
                                                value={formik.values.jobPosition.id}
                                                onChange={formik.handleChange}
                                        >
                                                <MenuItem value="">
                                                        <em>None</em>
                                                </MenuItem>

                                                {jobPositions.map((position, index) => (
                                                        <MenuItem key={index} value={position.id} label ={position.position}>{position.position}</MenuItem>
                                                
                                                ))}
                                        </Select>

                                </FormControl>
                                {
                                       
                                                <div >
                                                        {formik.errors.jobPosition}
                                                </div>
                                        
                                }



                                


                                <Button
                                        onClick={() => {
                                                handleSubmit();
                                        }}
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        endIcon={<KeyboardArrowRightIcon />}
                                        className={classes.btn}
                                >
                                        SUBMIT
                                </Button>
                        </form>
                </Container>
        );
}

export default AddJobAdvertisementPage;
