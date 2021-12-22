import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/jobpositions"

const requestPath = domainName + reqMap

export default class JobPositionService {

        getAll(){
                return axios.get(requestPath + "/getall")
        }
        
        getById(id){
                return axios.get(requestPath + "/get?id=" + id)
        }

        getByName(name){
                return axios.get(requestPath + "/getByName?position=" + name)
        }
}

