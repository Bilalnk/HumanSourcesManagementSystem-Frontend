import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/candidatelinks"

const requestPath = domainName + reqMap

export default class CandidateLinksService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        getDtoByCandidateId(id){
                return axios.get(requestPath + "/getlinksdtosbycandidateid?id="+ id)
        }

        add(candidateLink){
                return axios.post(requestPath + "/add", candidateLink)
        }
        
}