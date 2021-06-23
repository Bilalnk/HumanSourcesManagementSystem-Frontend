import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
//TODO WayOfWorkService olarak isimlendir
import WayOfworkService from "../services/wayOfwork";
import WorkTypeService from "../services/workTypeService";
import JobAdvertisementService from "../services/jobAdvertisementService";
import {Button as MButton}  from "@material-ui/core";

export default function AddJobAd() {
        const history = useHistory();

        let jobAdvertisementService = new JobAdvertisementService();

        const [workTimes, setWorkTimes] = useState([]);
        const [workPlaces, setWorkPlaces] = useState([]);
        const [cities, setCities] = useState([]);
        const [jobPositions, setJobPositions] = useState([]);

        const JobAdvertAddSchema = Yup.object().shape({
                closingDate: Yup.date().nullable().required("Bu alanın doldurulması zorunludur"),
                jobDescription: Yup.string().required("Bu alanın doldurulması zorunludur"),
                jobPosition: Yup.object().required("Bu alanın doldurulması zorunludur"),
                wayOfWork: Yup.object().required("Bu alanın doldurulması zorunludur"),
                workType: Yup.object().required("Bu alanın doldurulması zorunludur"),
                city: Yup.object().required("Bu alanın doldurulması zorunludur"),
                numberOfOpenPosition: Yup.string().required("Posizyon sayısı zorunludur").min(1, "Posizyon sayısı 1 den küçük olamaz"),
                minSalary: Yup.number().min(0, "0 Dan az olamaz"),
                maxSalary: Yup.number().min(0, "0 Dan az olamaz")
        });


        const formik = useFormik({
                initialValues: {
                        jobDescription: "",
                        jobPosition: { id: "" },
                        wayOfWork: { id: "" },
                        workType: { id: "" },
                        numberOfOpenPosition: "",
                        city: { id: "" },
                        minSalary: "",
                        maxSalary: "",
                        closingDate: "",
                },
                validationSchema: JobAdvertAddSchema,
                onSubmit: (values) => {
                        values.employer = { id: 3 };
                        // jobAdvertisementService.add(JSON.stringify(values)).then((result) => console.log(result.data.data));
                        jobAdvertisementService.add(values).then((result) => console.log(result.data.data));
        
                        
                        console.log(values)
                        // alert("İş ilanı eklendi personelin onayı ardından listelenecektir");
                        // history.push("/");
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

                console.log(workTimes)
                console.log(workTimes)
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
        }

        return (
                <div>
                        <Card fluid>
                                <Card.Content header='İş ilanı Ekle' />
                                <Card.Content>
                                        <Form onSubmit={formik.handleSubmit}>
                                                <Form.Field style={{ marginBottom: "1rem" }}>
                                                        <label>İş Pozisyonu</label>
                                                        <Dropdown
                                                                clearable
                                                                item
                                                                placeholder="Pozisyon"
                                                                search
                                                                selection
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "jobPosition.id")
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="jobPosition"
                                                                value={formik.values.jobPosition.text}
                                                                options={jobPositionOption}
                                                        />
                                                        {formik.errors.jobPosition && formik.touched.jobPosition && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.jobPosition}
                                                                </div>
                                                        )}
                                                </Form.Field>
                                                <Form.Field>
                                                        <label>Şehir</label>
                                                        <Dropdown
                                                                clearable
                                                                item
                                                                placeholder="Şehir"
                                                                search
                                                                selection
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "city.id")
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="city"
                                                                value={formik.values.city.text}
                                                                options={cityOption}
                                                        />
                                                        {formik.errors.city && formik.touched.city && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.city}
                                                                </div>
                                                        )}
                                                </Form.Field>
                                                <Form.Field>
                                                        <label>Çalışma Türü</label>
                                                        <Dropdown
                                                                clearable
                                                                item
                                                                placeholder="Çalışma Türü"
                                                                search
                                                                selection
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "workType.id")
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="workType"
                                                                value={formik.values.workType.text}
                                                                options={workPlaceOption}
                                                        />
                                                        {formik.errors.workType && formik.touched.workType && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.workType}
                                                                </div>
                                                        )}
                                                </Form.Field>
                                                <Form.Field>
                                                        <label>Çalışma Şekli</label>
                                                        <Dropdown
                                                                clearable
                                                                item
                                                                placeholder="Çalışma Şekli"
                                                                search
                                                                selection
                                                                onChange={(event, data) =>
                                                                        handleChangeSemantic(data.value, "wayOfWork.id")
                                                                }
                                                                onBlur={formik.onBlur}
                                                                id="wayOfWork"
                                                                value={formik.values.wayOfWork.text}
                                                                options={workTimeOption}
                                                        />
                                                        {formik.errors.wayOfWork && formik.touched.wayOfWork && (
                                                                <div className={"ui pointing red basic label"}>{formik.errors.wayOfWork}</div>
                                                        )}
                                                </Form.Field>
                                                <Form.Field>
                                                        <Grid stackable>
                                                                <Grid.Column width={8}>
                                                                        <label style={{ fontWeight: "bold" }}>Min Maaş </label>
                                                                        <Input
                                                                                style={{ width: "100%" }}
                                                                                type="number"
                                                                                placeholder="MİNİMUM"
                                                                                value={formik.values.minSalary}
                                                                                name="minSalary"
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                        >
                                                                        </Input>
                                                                        {formik.errors.minSalary && formik.touched.minSalary && (
                                                                                <div className={"ui pointing red basic label"}>
                                                                                        {formik.errors.minSalary}
                                                                                </div>
                                                                        )}
                                                                </Grid.Column>
                                                                <Grid.Column width={8}>
                                                                        <label style={{ fontWeight: "bold" }}>Max Maaş</label>
                                                                        <Input
                                                                                style={{ width: "100%" }}
                                                                                type="number"
                                                                                placeholder="MAKSİMUM"
                                                                                value={formik.values.maxSalary}
                                                                                name="maxSalary"
                                                                                onChange={formik.handleChange}
                                                                                onBlur={formik.handleBlur}
                                                                        >
                                                                        </Input>
                                                                        {formik.errors.maxSalary && formik.touched.maxSalary && (
                                                                                <div className={"ui pointing red basic label"}>
                                                                                        {formik.errors.maxSalary}
                                                                                </div>
                                                                        )}
                                                                </Grid.Column>
                                                        </Grid>
                                                </Form.Field>

                                                <Form.Field>
                                                        <Grid stackable>
                                                                <Grid.Column width={8}>
                                                                        <label style={{ fontWeight: "bold" }}>Açık Pozisyon Sayısı</label>
                                                                        <Input
                                                                                style={{ width: "100%" }}
                                                                                id="numberOfOpenPosition"
                                                                                name="numberOfOpenPosition"
                                                                                error={Boolean(formik.errors.numberOfOpenPosition)}
                                                                                onChange={formik.handleChange}
                                                                                value={formik.values.numberOfOpenPosition}
                                                                                onBlur={formik.handleBlur}
                                                                                type="number"
                                                                                placeholder="Açık Pozisyon Sayısı"
                                                                        />
                                                                        {formik.errors.numberOfOpenPosition && formik.touched.numberOfOpenPosition && (
                                                                                <div className={"ui pointing red basic label"}>
                                                                                        {formik.errors.numberOfOpenPosition}
                                                                                </div>
                                                                        )}
                                                                </Grid.Column>
                                                                <Grid.Column width={8}>
                                                                        <label style={{ fontWeight: "bold" }}>Son Başvuru Tarihi</label>
                                                                        <Input
                                                                                style={{ width: "100%" }}
                                                                                type="date"
                                                                                error={Boolean(formik.errors.closingDate)}
                                                                                onChange={(event, data) =>
                                                                                        handleChangeSemantic(data.value, "closingDate")
                                                                                }
                                                                                value={formik.values.closingDate}
                                                                                onBlur={formik.handleBlur}
                                                                                name="closingDate"
                                                                                placeholder="Son başvuru tarihi"
                                                                        />
                                                                        {formik.errors.closingDate && formik.touched.closingDate && (
                                                                                <div className={"ui pointing red basic label"}>
                                                                                        {formik.errors.closingDate}
                                                                                </div>
                                                                        )}
                                                                </Grid.Column>
                                                        </Grid>
                                                </Form.Field>

                                                <Form.Field>
                                                        <label>Açıklama</label>
                                                        <TextArea
                                                                placeholder="Açıklama"
                                                                style={{ minHeight: 100 }}
                                                                error={Boolean(formik.errors.jobDescription).toString()}
                                                                value={formik.values.jobDescription}
                                                                name="jobDescription"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                        />
                                                        {formik.errors.jobDescription && formik.touched.jobDescription && (
                                                                <div className={"ui pointing red basic label"}>
                                                                        {formik.errors.jobDescription}
                                                                </div>
                                                        )}
                                                </Form.Field>
                                                {/* <Button
                                                        content="Ekle"
                                                        labelPosition="left"
                                                        icon="add"
                                                        positive
                                                        type="submit"
                                                        style={{ marginLeft: "20px" }}
                                                /> */}

                                                <MButton
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                onClick={
                                                        console.log(formik.errors)}
                                                >
                                                        EKLE
                                                </MButton>
                                        </Form>
                                </Card.Content>
                        </Card>
                </div>
        );
}