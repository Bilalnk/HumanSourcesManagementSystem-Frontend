import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/candidatelangs"

const requestPath = domainName + reqMap

export default class CandidateLanguagesService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(candidateLanguage){
                return axios.post(requestPath + "/add", candidateLanguage)
        }
        
        delete(id){
                return axios.delete(requestPath + "/delete?id="+ id)
        }

        getByCandidateId(candidateId){
                return axios.get(requestPath + "/getByCandidateId?candidateId=" + candidateId)
        }
        
}