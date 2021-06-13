import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/candidateschoolinfo"


const requestPath = domainName + reqMap

export default class CandidateSchoolInfoService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(candidateschoolinfo){
                return axios.post(requestPath + "/add", candidateschoolinfo)
        }

        getAllByIdOrderDesc(id){
                return axios.get(requestPath + "/getallorderdesc?candidateId=" + id)
        }
        
}