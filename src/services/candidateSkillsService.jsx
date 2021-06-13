import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/candidateskills"

const requestPath = domainName + reqMap

export default class CandidateSkillsService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(candidateSkill){
                return axios.post(requestPath + "/add", candidateSkill)
        }
        
}