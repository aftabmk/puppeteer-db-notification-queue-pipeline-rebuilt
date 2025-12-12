class OptionWorker {
    constructor(manager,page) {
        super(manager,page);
    }

    async workflow() {
        // navigate
        await super.navigate()
        // get fetch
        await super.fetch();
        // build url
        super.processData()
        // fetch expiry
        await super.fetchExpiry()
        // send sns
        await super.sendSNS();
    }
    
    async workflowCached() {
        super.clearPrevExpiryData();
        // fetch expiry
        await super.fetchExpiry()
        // send sns
        await super.sendSNS();
    }
}

module.exports = { OptionWorker };