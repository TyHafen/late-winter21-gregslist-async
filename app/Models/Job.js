export class Job {
  constructor(data) {
    this.id = data.id || ''
    this.jobTitle = data.jobTitle || ''
    this.company = data.company || ''
    this.rate = data.rate || ''
    this.hours = data.hours || ''
    this.description = data.description || ''


  }


  get Template() {
    return `
          <div class="col-md-4">
            <div class="bg-white rounded shadow">
              <div class="p-3 clip-text">
                <p>$${this.rate} | ${this.jobTitle} | ${this.company}</p>
                <p></p>
                <p>${this.description}</p>
                <p>${this.hours} hours per week</p>
                <div class="text-end">
                <button class="btn btn-outline-warning" onclick="app.jobsController.editJob('${this.id}')"> Edit </button>
                <button class="btn btn-outline-danger" onclick="app.jobsController.deleteJob('${this.id}')"> delete </button>
                </div>
              </div>
            </div>
          </div>
        `
  }
}

