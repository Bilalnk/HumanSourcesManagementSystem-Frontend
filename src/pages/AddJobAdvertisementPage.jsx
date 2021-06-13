import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { FormControl } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Container } from "@material-ui/core";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import Button from "@material-ui/core/Button";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import TextField from "@material-ui/core/TextField";


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
        const [selectedCity, setSelectedCity] = useState("");

        const [jobPositions, setJobPositions] = useState([])
        const [selectedJobPosition, setSelectedJobPositions] = useState("")

        const [jobDescription, setJobDescription] = useState("")
        const [jobDescriptionError, setJobDescriptionError] = useState(false)

        const [minSalary, setMinSalary] = useState("")
        const [maxSalary, setMaxSalary] = useState("")

        const [openPositionCount, setOpenPositionCount] = useState("")

        const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));


        useEffect(() => {
                let cityService = new CityService();
                cityService.getAll().then((result) => setCity(result.data.data));

                let jobPositionService = new JobPositionService()
                jobPositionService.getAll().then((result) => setJobPositions(result.data.data))
                        .catch();

                console.log(jobPositions)

        }, []);

        const handleChangeCities = (event) => {
                setSelectedCity(event.target.value)
        };

        const handleChangeJobPositions = (event) => {
                setSelectedJobPositions(event.target.value)
        };


        const handleDateChange = (date) => {
                setSelectedDate(date);
                console.log(date)
                console.log(selectedDate)
        };


        const handleSubmit = (e) => {
                // e.preventDefault()

                if (jobDescription === "") {
                        setJobDescriptionError(true);
                }

                if (jobDescription) {
                        setJobDescriptionError(false);

                        console.log(jobDescription)
                }
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


                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Job Positions</InputLabel>
                                <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selectedJobPosition}
                                        onChange={handleChangeJobPositions}
                                        label="Job Position"
                                >
                                        <MenuItem value="">
                                                <em>None</em>
                                        </MenuItem>

                                        {jobPositions.map((position) => (
                                                <MenuItem key={position.id} value={position.id}>{position.position}</MenuItem>
                                        ))}
                                </Select>
                        </FormControl>


                        <form onSubmit={handleSubmit}>
                                <TextField
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className={classes.field}
                                        label="Job Description"
                                        variant="outlined"
                                        color="secondary"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                        error={jobDescriptionError}
                                />
                        </form>

                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cities</InputLabel>
                                <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={selectedCity}
                                        onChange={handleChangeCities}
                                        label="City"
                                >
                                        <MenuItem value="">
                                                <em>None</em>
                                        </MenuItem>

                                        {city.map((c) => (
                                                <MenuItem key={c.id} value={c.id}>{c.city}</MenuItem>
                                        ))}
                                </Select>
                        </FormControl>

                        <form onSubmit={handleSubmit} className={classes.formControl}>
                                <Typography
                                        className={classes.salaryTitle}
                                        variant="h6"
                                        component="h2"
                                        color="textSecondary"
                                        gutterBottom
                                >
                                        Salary
                                </Typography>
                                <TextField
                                        onChange={(e) => setMinSalary(e.target.value)}
                                        id="min-salary"
                                        label="Min"
                                        type="number"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}
                                        variant="outlined"
                                        className={classes.salaryMin}
                                />

                                <TextField
                                        onChange={(e) => setMaxSalary(e.target.value)}
                                        id="max-salary"
                                        label="Max"
                                        type="number"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}
                                        variant="outlined"
                                        className={classes.salaryMax}
                                />

                        </form>

                        <form onSubmit={handleSubmit} className={classes.formControl}>
                                <TextField
                                        onChange={(e) => setOpenPositionCount(e.target.value)}
                                        id="open-position-count"
                                        label="PositionCount"
                                        fullWidth
                                        type="number"
                                        InputLabelProps={{
                                                shrink: true,
                                        }}
                                        variant="outlined"
                                />
                        </form>



                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                                disableToolbar
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-inline"
                                                label="Date picker inline"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                fullWidth
                                                KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                }}
                                        />

                                </Grid>
                        </MuiPickersUtilsProvider>


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

                </Container>
        );
}

export default AddJobAdvertisementPage;