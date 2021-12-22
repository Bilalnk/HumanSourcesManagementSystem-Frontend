import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/employers"

const requestPath = domainName + reqMap

export default class EmployersService {

        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(employer){
                return axios.post(requestPath + "/add", employer)
        }

        getById(id){
                return axios.get(requestPath + "/get?id=" + id)
        }
}