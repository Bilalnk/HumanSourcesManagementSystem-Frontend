import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/langlevel"

const requestPath = domainName + reqMap

export default class LanguageLevelsService {

        add(level){
                return axios.post(requestPath + "/add", level)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}