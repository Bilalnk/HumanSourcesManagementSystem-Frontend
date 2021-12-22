import { domainName } from "./baseService"
import axios from "axios"

const reqMap = "/api/uploadphoto"

const requestPath = domainName + reqMap

export default class CandidatePhotoService {

        getAll() {
                return axios.get(requestPath + "/getall")
        }

        fileUpload(id, file) {
                
                const formData = new FormData();
                formData.append('file', file)
                const config = {
                        headers: {
                                'content-type': 'multipart/form-data'
                        }
                }
                return axios.post(requestPath + "/add?id=" + id, formData, config)
        }

        add(id, candidatePhoto) {
                return axios.post(requestPath + "/add?id=" + id, candidatePhoto)
        }

        getById(id) {
                return axios.get(requestPath + "/getbyid?id=" + id)
        }

        addPreface(id, preface) {
                return axios.post(requestPath + "/addpreface?candidateId=" + id + "&preface=" + preface)
        }

}