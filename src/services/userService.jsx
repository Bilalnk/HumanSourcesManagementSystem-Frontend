import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api"

const requestPath = domainName + reqMap

export default class UserService {

        login(email, password) {
                return axios.get(requestPath + "/login?email=" + email + "&password=" + password)
        }

        getLoggedinUser(email, password) {
                return axios.get(requestPath + "/loginandget?email=" + email + "&password=" + password)
        }

}