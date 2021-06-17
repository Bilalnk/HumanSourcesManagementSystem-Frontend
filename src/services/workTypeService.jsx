import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/worktype"

const requestPath = domainName + reqMap

export default class WorkTypeService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}