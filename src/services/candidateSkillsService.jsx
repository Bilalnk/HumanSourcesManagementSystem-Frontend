import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/candidateskills"

const requestPath = domainName + reqMap

export default class CandidateSkillsService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(candidateSkill){
                return axios.post(requestPath + "/add", candidateSkill)
        }

        delete(id){
                return axios.delete(requestPath + "/delete?id=" + id)
        }

        getByCandidateId(id){
                return axios.get(requestPath + "/getbycandidateid?candidateId=" + id)
        }
        
}