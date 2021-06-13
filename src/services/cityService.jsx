import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/cities"

const requestPath = domainName + reqMap

export default class CityService {

        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
        
}