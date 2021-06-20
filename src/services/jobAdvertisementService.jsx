import axios from "axios"

const domainName = "http://localhost:8081"
const reqMap = "/api/jobadvertisement"

const requestPath = domainName + reqMap

export default class JobAdvertisementService {


        add(jobAdvertisement){
                return axios.post(requestPath + "/add", jobAdvertisement)
        }

        getByActiveTrue(){
                return axios.get(requestPath + "/getactives")
        }

        getByActiveTrueAndEmployerId (employerId){

                return axios.get(requestPath + "/getactiveandemployer?employerId=" + employerId)
        }
        
        getByActiveTrueOrderByPublishedDateDesc (){
                return axios.get(requestPath + "/getactivesasc")
        }

        
        getJobAdveritsementDetails(){
                return axios.get(requestPath + "/getjobadvertisementdetails")
        }

        getJobAdveritsementById(id){
                return axios.get(requestPath + "/getjobadvertisementbyid?id=" + id)
        }
        
        updateAdvertisementActive(active, id){
                return axios.get(requestPath + "/updateAdvertisementActive?active=" + active + "&id="+ id)
        }

        updateAdvertisementConfirm(confirm, id){
                return axios.get(requestPath + "/updateAdvertisementConfirm?confirm=" + confirm + "&id="+ id)
        }

        getByConfirmedByEmployeesFalseOrderByPublishedDateDesc(){
                return axios.get(requestPath + "/getByConfirmedByEmployeesFalseOrderByPublishedDateDesc")
        }


}



