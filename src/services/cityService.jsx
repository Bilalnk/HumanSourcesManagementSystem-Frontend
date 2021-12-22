import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/cities"

const requestPath = domainName + reqMap

export default class CityService {

        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
        
}