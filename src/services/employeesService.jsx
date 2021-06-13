import axios from "axios"

const domainName = "http://localhost:8081"
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