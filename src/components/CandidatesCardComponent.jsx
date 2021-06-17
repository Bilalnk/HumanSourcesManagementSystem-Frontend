import React from 'react'
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { CardActions } from '@material-ui/core';
import { Avatar, Typography, makeStyles, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
        root: {
                maxWidth: 345,
        },
        media: {
                height: 140,
        },
        avatar: {
                backgroundColor: () => {
                        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
                }
        },
        cardActionButton: {

        }
});

function CandidatesCardComponent({ candidate }) {

        const history = useHistory();
        const classes = useStyles();

        return (
                <Card elevation={3} className={classes.root}>
                        <CardHeader
                                avatar={
                                        <Avatar className={classes.avatar}>
                                                {candidate.firstName[0].toUpperCase()}
                                        </Avatar>
                                }
                                titleTypographyProps={{ variant: 'h6' }}
                                title={candidate.firstName + " " + candidate.lastName}
                                subheader={candidate.email}
                        >
                        </CardHeader>

                        <CardContent>
                                <Typography variant="body1" color="textSecondary" component="p">
                                        {candidate.bod.substring(0, 10)}
                                </Typography>
                        </CardContent>

                        <CardActions>
                                <Button
                                        fullWidth
                                        className={classes.cardActionButton}
                                        size="large"
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => history.push("/candidate/" + candidate.id)}
                                >
                                        Cv görüntüle
                                </Button>
                        </CardActions>

                </Card>
        )
}

export default CandidatesCardComponent
