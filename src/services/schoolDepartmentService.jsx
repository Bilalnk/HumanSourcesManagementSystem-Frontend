import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/schooldepartments"

const requestPath = domainName + reqMap

export default class SchoolDepartmentService {

        add(schooldepartment){
                return axios.post(requestPath + "/add", schooldepartment)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        getBySchoolId(id){
                return axios.get(requestPath + "/getdtobycshoolid?schoolId=" + id)
        }
}