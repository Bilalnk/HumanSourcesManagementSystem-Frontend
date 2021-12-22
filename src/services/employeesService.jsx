import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/employees"

const requestPath = domainName + reqMap

export default class EmployeesService {

        
        verify(id, active){
                return axios.post(requestPath + "/verify?active="+ active + "&id=" + id)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(employee){
                return axios.post(requestPath + "/add", employee)
        }
}