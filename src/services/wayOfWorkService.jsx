import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/wayofwork"

const requestPath = domainName + reqMap

export default class WayOfWorkService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}