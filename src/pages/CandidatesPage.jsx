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


        useEffect(() => {

                let candidateService = new CandidatesService();
                candidateService.getAll().then((result) => setCandidates(result.data.data))
                console.log(candidates)
        }, [])

        return (

                <Masonary 
                breakpointCols={4}
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
