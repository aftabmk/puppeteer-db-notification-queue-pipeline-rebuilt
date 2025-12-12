class FutureWorker {
    constructor(manager,page) {
        super(manager,page);
    }

    async workflow() {
        // navigate
        await super.navigate()
        // get fetch
        await super.fetch();
        // send sns
        await super.sendSNS();
    }
    
    async workflowCached() {
        super.clearPrevExpiryData();
        // fetch expiry
        await super.fetch()
        // send sns
        await super.sendSNS();
    }
}

module.exports = { FutureWorker };