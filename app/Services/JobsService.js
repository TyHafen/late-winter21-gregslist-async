import { ProxyState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { api } from "./AxiosService.js"




class JobsService {
    async editJob(updateJob, id) {
        const res = await api.put('jobs/' + updateJob)
        console.log("jobserve edit", res.data)
        const jobIndex = ProxyState.jobs.findIndex(j => j.id == id)
        ProxyState.jobs.splice(jobIndex, 1, new Job(res.data))


    }

    async createJob(newJob) {

        const res = await api.post('jobs', newJob)
        let realJob = new Job(res.data)
        ProxyState.jobs = [realJob, ...ProxyState.jobs]




    }
    async getAllJobs() {
        const res = await api.get('jobs')
        console.log(res.data)
        ProxyState.jobs = res.data.map(rd => new Job(rd))
        console.log(ProxyState.jobs);
    }


    async deleteJob(id) {
        const res = await api.delete('jobs/' + id)
        ProxyState.jobs = ProxyState.jobs.filter(j => j.id != id)

    }
}




export const jobsService = new JobsService()