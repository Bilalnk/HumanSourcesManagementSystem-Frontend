import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/uploadphoto"

const requestPath = domainName + reqMap

export default class CandidatePhotoService {
        
        getAll(){
                return axios.get(requestPath + "/getall")
        }

        add(id, candidatePhoto){
                return axios.post(requestPath + "/add?id=" + id, candidatePhoto)
        }

        getById(id){
                return axios.get(requestPath + "/getbyid?id=" + id)
        }

        
        
}