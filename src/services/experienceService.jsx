import axios from "axios"

const domainName = "http://localhost:8081"
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


        getByCandidateIdDesc(candidateId){
                return axios.get(requestPath + "/getbycandidateId?candidateId=" + candidateId)
        }

}