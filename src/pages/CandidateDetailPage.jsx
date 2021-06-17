import React from 'react'
import { useHistory, useParams } from "react-router-dom";

function CandidateDetailPage() {

        
        const { candidateId } = useParams();

        return (
                <div>
                        candidate detail {candidateId}
                </div>
        )
}

export default CandidateDetailPage
