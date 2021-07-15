import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core';
import CandidatesService from '../services/candidatesService'
import CandidatesCardComponent from "../components/CandidatesCardComponent";
import Masonary from "react-masonry-css";

const useStyles = makeStyles({
        root: {
                maxWidth: 345,
        },
        media: {
                height: 140,
        },
});

function CandidatesPage() {

        const classes = useStyles();

        const [candidates, setCandidates] = useState([]);

        const breakpoints = {
                default: 4,
                2800: 7,
                2500: 6,
                2100: 5,
                1800: 4,
                1500: 3,
                1200: 2,
                950: 1
        }

        useEffect(() => {

                let candidateService = new CandidatesService();
                candidateService.getAll().then((result) => setCandidates(result.data.data))
                console.log(candidates)
        }, [])

        return (

                <Masonary
                        breakpointCols={breakpoints}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">

                        {candidates.map(candidate => (
                                <div key={candidate.id}>
                                        <CandidatesCardComponent candidate={candidate} />
                                </div>
                        ))}
                </Masonary>
        )
}

export default CandidatesPage
