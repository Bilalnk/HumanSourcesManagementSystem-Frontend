import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/worktype"

const requestPath = domainName + reqMap

export default class WorkTypeService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}