
import _ from 'lodash'
import React, { useEffect, useState } from "react";

import Checkbox from '@material-ui/core/Checkbox';
import { Dropdown, Input, TextArea, Checkbox as SCheckbox, Form, Grid } from "semantic-ui-react";
import { Button } from "@material-ui/core";
import { Paper } from '@material-ui/core'
import * as Yup from "yup";
import { useFormik } from "formik";

import { Table } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";


import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { makeStyles } from "@material-ui/core/styles";

import CityService from "../services/cityService";
import WorkTypeService from "../services/workTypeService";
import WayOfworkService from "../services/wayOfWorkService"
import JobPositionService from "../services/jobPositionService";

const useStyles = makeStyles({
        container: {
                marginLeft: 8,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 400,
        },
        checkboxes: {
                margin: 2,
                display: 'flex',
                flexDirection: 'column'
        },
        paperElement: {
                padding: 5,
                marginBottom: 8,
                minWidth: 200,
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column'

        }
})


function JobFilterComponent({ handleFilter }) {

        const classes = useStyles()
        let wayOfworkService = new WayOfworkService();
        let workTypeService = new WorkTypeService();
        let cityService = new CityService();
        let jobPositionService = new JobPositionService();

        const [state, setState] = React.useState({});

        const [workTimes, setWorkTimes] = useState([]);
        const [workPlaces, setWorkPlaces] = useState([]);
        const [cities, setCities] = useState([]);
        const [jobPositions, setJobPositions] = useState([]);

        const filterSchema = Yup.object().shape({
                jobPositionId: Yup.array(),
                wayOfWorkId: Yup.array(),
                workTypeId: Yup.array(),
                cityId: Yup.array(),
        });


        const formik = useFormik({
                initialValues: {
                        jobPositionId: [],
                        wayOfWorkId: [],
                        workTypeId: [],
                        cityId: [],
                },
                validationSchema: filterSchema,
                onSubmit: (values) => {
                        console.log(values)
                        handleFilter(values)
                },
        });

        useEffect(() => {
                let wayOfworkService = new WayOfworkService();
                let workTypeService = new WorkTypeService();
                let cityService = new CityService();
                let jobPositionService = new JobPositionService();

                wayOfworkService.getAll().then((result) => setWorkTimes(result.data.data));
                workTypeService.getAll().then((result) => setWorkPlaces(result.data.data));
                cityService.getAll().then((result) => setCities(result.data.data));
                jobPositionService.getAll().then((result) => setJobPositions(result.data.data));
        }, []);

        const workTimeOption = workTimes.map((workTime, index) => ({
                key: index,
                // text: workTime.type,
                text: workTime.wayWorking,
                value: workTime.id,

        }));
        const workPlaceOption = workPlaces.map((workPlace, index) => ({
                key: index,
                text: workPlace.type,
                value: workPlace.id,
        }));
        const cityOption = cities.map((city, index) => ({
                key: index,
                text: city.city,
                value: city.id,
        }));
        const jobPositionOption = jobPositions.map((jobPosition, index) => ({
                key: index,
                text: jobPosition.position,
                value: jobPosition.id,
        }));

        const handleChangeSemantic = (value, fieldName) => {
                formik.setFieldValue(fieldName, value);
                document.getElementById("submitButton").click()

        }

        const handleChange = (event, data) => {
                setState({ ...state, [event.target.name]: event.target.checked });
                // setState(event.target.checked);
                console.log(event.target)
                console.log(data.value)
        };

        return (
                <div className={classes.container}>
                        <Form onSubmit={formik.handleSubmit}>
                                <Paper elevation={2} className={classes.paperElement}>
                                        <Table >
                                                <Table.Header>
                                                        <Table.Row>
                                                                <Table.HeaderCell colSpan="1">

                                                                        <Typography className={classes.tableHeader}> Pozisyon </Typography>
                                                                </Table.HeaderCell>
                                                        </Table.Row>
                                                </Table.Header>
                                                <Form.Field>
                                                        <Dropdown
                                                                placeholder='Pozisyon'
                                                                fluid
                                                                multiple
                                                                search
                                                                selection
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "jobPositionId")
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="jobPositionId"
                                                                value={formik.values.jobPositionId.text}
                                                                options={jobPositionOption}
                                                        />
                                                </Form.Field>
                                        </Table>

                                </Paper>

                                <Paper elevation={2} className={classes.paperElement}>

                                        <Table >
                                                <Table.Header>
                                                        <Table.Row>
                                                                <Table.HeaderCell colSpan="1">

                                                                        <Typography className={classes.tableHeader}> Şehir </Typography>
                                                                </Table.HeaderCell>
                                                        </Table.Row>
                                                </Table.Header>
                                                <Form.Field>
                                                        <Dropdown
                                                                placeholder='Şehir'
                                                                fluid
                                                                multiple
                                                                search
                                                                selection
                                                                onChange={(event, data) => {
                                                                        handleChangeSemantic(data.value, "cityId")
                                                                }
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="cityId"
                                                                value={formik.values.cityId.text}
                                                                options={cityOption}

                                                        />
                                                </Form.Field>
                                        </Table>

                                </Paper>

                                <Paper elevation={2} className={classes.paperElement}>

                                        <Table >
                                                <Table.Header>
                                                        <Table.Row>
                                                                <Table.HeaderCell colSpan="1">

                                                                        <Typography className={classes.tableHeader}> Çalışma Şekli </Typography>
                                                                </Table.HeaderCell>
                                                        </Table.Row>
                                                </Table.Header>

                                                <Form.Field>
                                                        <Dropdown
                                                                placeholder='Çalışma Şekli'
                                                                fluid
                                                                multiple
                                                                search
                                                                selection
                                                                onChange={(event, data) => {
                                                                        handleChangeSemantic(data.value, "wayOfWorkId")
                                                                }
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="wayOfWorkId"
                                                                value={formik.values.wayOfWorkId.text}
                                                                options={workTimeOption}

                                                        />
                                                </Form.Field>

                                        </Table>


                                </Paper>
                                <Paper elevation={2} className={classes.paperElement}>

                                        <Table >
                                                <Table.Header>
                                                        <Table.Row>
                                                                <Table.HeaderCell colSpan="1">

                                                                        <Typography className={classes.tableHeader}> Çalışma Türü </Typography>
                                                                </Table.HeaderCell>
                                                        </Table.Row>
                                                </Table.Header>


                                                <Form.Field>
                                                        <Dropdown
                                                                placeholder='Çalışma Türü'
                                                                fluid
                                                                multiple
                                                                search
                                                                selection
                                                                onChange={(event, data) => {
                                                                        handleChangeSemantic(data.value, "workTypeId")
                                                                }
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="workTypeId"
                                                                value={formik.values.workTypeId.text}
                                                                options={workPlaceOption}

                                                        />
                                                </Form.Field>
                                        </Table>
                                </Paper>

                                <Button
                                        id="submitButton"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                >
                                        Filtrele
                                </Button>

                        </Form>

                </div >
        )
}

export default JobFilterComponent
