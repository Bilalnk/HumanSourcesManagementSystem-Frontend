import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/schools"

const requestPath = domainName + reqMap

export default class SchoolService {

        add(school){
                return axios.post(requestPath + "/add", school)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}