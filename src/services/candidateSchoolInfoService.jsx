import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/candidateschoolinfo"


const requestPath = domainName + reqMap

export default class CandidateSchoolInfoService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(candidateschoolinfo){
                return axios.post(requestPath + "/add", candidateschoolinfo)
        }

        delete(id){
                return axios.delete(requestPath + "/delete?id="+id)
        }

        getAllByIdOrderDesc(id){
                return axios.get(requestPath + "/getallorderdesc?candidateId=" + id)
        }
        
}