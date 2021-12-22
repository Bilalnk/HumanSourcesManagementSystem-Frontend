import axios from "axios"
import { domainName } from "./baseService"

const reqMap = "/api/favorites"
const requestPath = domainName + reqMap


export default class CandidateFavoriteJobsService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(jobAdvertisemet){
                return axios.post(requestPath + "/addtofavorite", jobAdvertisemet)
        }
        
        delete(id){
                return axios.delete(requestPath + "/delete?id="+ id)
        }

        getByCandidateId(candidateId){
                return axios.get(requestPath + "/getbycandidateid?id=" + candidateId)
        }
        
}
