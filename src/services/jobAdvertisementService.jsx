import { domainName } from "./baseService"
import axios from "axios"

// const domainName = "http://localhost:8081"
const reqMap = "/api/jobadvertisement"
// const requestPath = BaseService.getDomainName() + reqMap
const requestPath = domainName + reqMap



export default class JobAdvertisementService {


        add(jobAdvertisement) {
                return axios.post(requestPath + "/add", jobAdvertisement)
        }

        getByActiveTrue() {
                return axios.get(requestPath + "/getactives")
        }

        getByActiveTrueAndEmployerId(employerId) {

                return axios.get(requestPath + "/getactiveandemployer?employerId=" + employerId)
        }

        getByActiveTrueOrderByPublishedDateDesc() {
                return axios.get(requestPath + "/getactivesasc")
        }


        getJobAdveritsementDetails() {
                return axios.get(requestPath + "/getjobadvertisementdetails")
        }

        getFilteredAndPaginated(filter = {}, pageNo = 1, pageSize = 10) {
                return axios.post(requestPath + "/get-filtered-and-paginated?pageNo=" + pageNo + "&pageSize=" + pageSize, filter)
        }

        getJobAdveritsementById(id) {
                return axios.get(requestPath + "/getjobadvertisementbyid?id=" + id)
        }

        updateAdvertisementActive(active, id) {
                return axios.get(requestPath + "/updateAdvertisementActive?active=" + active + "&id=" + id)
        }

        updateAdvertisementConfirm(confirm, id) {
                return axios.get(requestPath + "/updateAdvertisementConfirm?confirm=" + confirm + "&id=" + id)
        }

        getByConfirmedByEmployeesFalseOrderByPublishedDateDesc() {
                return axios.get(requestPath + "/getByConfirmedByEmployeesFalseOrderByPublishedDateDesc")
        }


}



