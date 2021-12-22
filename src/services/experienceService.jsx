import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/experience"

const requestPath = domainName + reqMap

export default class ExperienceService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        getAllDesc(){
                return axios.get(requestPath + "/getalldesc")
        }

        add(experience){
                return axios.post(requestPath + "/add", experience)
        }

        delete(id){
                return axios.delete(requestPath + "/delete?id="+ id)
        }

        getByCandidateIdDesc(candidateId){
                return axios.get(requestPath + "/getbycandidateId?candidateId=" + candidateId)
        }

}