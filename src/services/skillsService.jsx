import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/skills"

const requestPath = domainName + reqMap

export default class SkillsService {

        add(skill){
                return axios.post(requestPath + "/add", skill)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}