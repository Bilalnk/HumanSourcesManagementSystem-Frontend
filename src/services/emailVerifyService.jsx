import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/verification"

const requestPath = domainName + reqMap

export default class EmailVerificationService {

        
        verify(id, activationCode){
                return axios.post(requestPath + "/verify?activationCode="+ activationCode + "&id=" + id)
        }
        
}