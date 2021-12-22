import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/lang"

const requestPath = domainName + reqMap

export default class LanguagesService {

        add(language){
                return axios.post(requestPath + "/add", language)
        }
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }
}