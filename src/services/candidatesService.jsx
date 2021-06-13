import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/candidates"

const requestPath = domainName + reqMap

export default class CandidatesService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(candidate){
                return axios.post(requestPath + "/add", candidate)
        }
        
        getById(id){
                return axios.get(requestPath + "/get?id=" + id)
        }

        getCv(id){
                return axios.get(requestPath + "/getcv?id=" + id)
        }
}