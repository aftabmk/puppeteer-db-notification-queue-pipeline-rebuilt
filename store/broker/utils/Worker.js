class Worker {
    constructor(manager,page) {
        this.page = page;
        this.manager = manager;
    }
    async navigate() {}
    async fetch() {}
    async sendSNS() {}
}

module.exports = { Worker };