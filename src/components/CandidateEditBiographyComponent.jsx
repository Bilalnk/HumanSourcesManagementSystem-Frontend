import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
        root: {
                '& > *': {
                        margin: theme.spacing(1),
                        width: '25ch',
                },
        },
}));

function CandidateEditBiographyComponent({ candidateId, getChanges}) {


        const classes = useStyles();

        const [biography, setBiography] = useState("")

        const save = (value) => {
                setBiography(value)
                getChanges(value)
        }

        return (

                <TextField
                        onChange={(e) => save(e.target.value)}
                        className={classes.field}
                        label="Kısaca kendinden bahset.."
                        variant="outlined"
                        color="secondary"
                        helperText={candidateId}
                        multiline
                        rows={4}
                        fullWidth
                        required
                />
        )
}

export default CandidateEditBiographyComponent
