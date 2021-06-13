import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/schooldepartments"

const requestPath = domainName + reqMap

export default class SchoolDepartmentService {

        add(schooldepartment){
                return axios.post(requestPath + "/add", schooldepartment)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}