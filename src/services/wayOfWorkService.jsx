import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/wayofwork"

const requestPath = domainName + reqMap

export default class WayOfWorkService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}