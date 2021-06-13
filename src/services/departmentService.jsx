import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/departments"

const requestPath = domainName + reqMap

export default class DepartmentService {

        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        getByName(name){
                return axios.get(requestPath + "/getbyname?name=" + name)
        }
        
        add(department){
                return axios.post(requestPath + "/add", department)
        }
}