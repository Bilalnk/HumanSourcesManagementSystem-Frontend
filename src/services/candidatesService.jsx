import { domainName } from "./baseService"
import axios from "axios"

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

        update(info){
                return axios.post(requestPath + "/update", info)
        }
}