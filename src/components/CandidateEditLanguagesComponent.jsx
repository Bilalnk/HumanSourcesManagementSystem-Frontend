import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import { useEffect } from 'react';

import LanguagesService from "../services/languagesService"
import LanguageLevelsService from "../services/languageLevelsService"


const useStyles = makeStyles((theme) => ({
        formControl: {
                margin: theme.spacing(2),
                minWidth: 120,

                flexDirection: 'row'
        },
        inputsDiv: {
                width: 355
        }

}));

function CandidateEditLanguagesComponent({ candidateId, getChanges }) {

        let languageService = new LanguagesService()
        let languageLevelService = new LanguageLevelsService()

        const classes = useStyles();
        const [language, setLanguage] = useState('');
        const [languageLevel, setLanguageLevel] = useState('');

        const [languages, setLanguages] = useState([])
        const [levels, setLevels] = useState([])


        useEffect(() => {
                languageService.getAll().then((result) => setLanguages(result.data.data))
                languageLevelService.getAll().then((result) => setLevels(result.data.data))

        }, [])



        const handleChangeLanguage = (event) => {
                setLanguage(event.target.value);

                getChanges(event.target.value, languageLevel)
        };

        const handleChangeLevel = (event) => {
                setLanguageLevel(event.target.value);

                getChanges(language, event.target.value)
        };

        return (
                <div >
                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="language-label">Dil</InputLabel>
                                <Select
                                        labelId="language-label"
                                        id="language"
                                        value={language}
                                        onChange={handleChangeLanguage}
                                        label="Dil"
                                        className={classes.inputsDiv}
                                >
                                        <MenuItem value="">
                                                <em>None</em>
                                        </MenuItem>

                                        {
                                                languages.map((lang) => (

                                                        <MenuItem value={lang.id}>{lang.languagesName}</MenuItem>
                                                ))
                                        }

                                </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="languageLevel-label">Seviye</InputLabel>
                                <Select
                                        labelId="languageLevel-label"
                                        id="languageLevel"
                                        value={languageLevel}
                                        onChange={handleChangeLevel}
                                        label="Seviye"
                                        className={classes.inputsDiv}
                                >
                                        <MenuItem value="">
                                                <em>None</em>
                                        </MenuItem>
                                        {
                                                levels.map((level) => (

                                                        <MenuItem value={level.id}>{level.languageLevel}</MenuItem>
                                                ))
                                        }
                                </Select>
                        </FormControl>
                </div>


        )
}

export default CandidateEditLanguagesComponent
