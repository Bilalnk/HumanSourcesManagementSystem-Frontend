import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/login"

const requestPath = domainName + reqMap

export default class UserService{

        login(email, password){
                return axios.get(requestPath + "?email="+email+"&password="+password)
        }

}