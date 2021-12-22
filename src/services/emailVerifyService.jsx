import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/verification"

const requestPath = domainName + reqMap

export default class EmailVerificationService {

        
        verify(id, activationCode){
                return axios.post(requestPath + "/verify?activationCode="+ activationCode + "&id=" + id)
        }
        
}