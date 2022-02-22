import { Pop } from "../Utils/Pop.js"
import { ProxyState } from "../AppState.js"
import { jobsService } from "../Services/JobsService.js"
import { getJobForm } from "../Components/JobForm.js"

function _draw() {
    let template = ``
    ProxyState.jobs.forEach(j => template += j.Template)
    document.getElementById('listings').innerHTML = template
}



export class JobsController {
    constructor() {
        ProxyState.on('jobs', _draw)
    }

    async viewJobs() {
        try {
            await jobsService.getAllJobs()
            document.getElementById('modal-body-slot').innerHTML = getJobForm()
            document.getElementById('create-button').classList.remove('visually-hidden')
        } catch (error) {
            Pop.toast(error.message, 'error')
            console.log(error);
        }

    }

    async deleteJob(id) {
        try {
            if (await Pop.confirm()) {
                await jobsService.deleteJob(id)
            }
        } catch (error) {
            console.log(error);
            Pop.error(error)

        }
    }
    async handleSubmit(id) {
        try {
            window.event.preventDefault()
            let form = window.event.target
            let rawData = {
                rate: form.rate.value,
                jobTitle: form.jobTitle.value,
                company: form.company.value,
                description: form.description.value,
                hours: form.hours.value
            }
            if (!id) {
                jobsService.createJob(rawData)
            } else {
                jobsService.editJob(rawData, id)
            }
            let modal = document.getElementById('new-listing')
            form.reset()
            bootstrap.Modal.getOrCreateInstance(modal).hide()
            Pop.toast('Complete')
        } catch (error) {
            console.log('handleSubmit', error);
            Pop.toast(error.message)

        }

    }

    editJob(id) {
        const job = ProxyState.jobs.find(j => j.id == id)
        document.getElementById('modal-body-slot').innerHTML = getJobForm(job)
        let modal = document.getElementById('new-listing')
        bootstrap.Modal.getOrCreateInstance(modal).toggle()
    }
}