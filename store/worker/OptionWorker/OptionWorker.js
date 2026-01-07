const { OptionWorkerUtils } = require("./utils/OptionWorkerUtils");

class OptionWorker extends OptionWorkerUtils {
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
        // await super.sendSQS();
    }
    
    async workflowCached() {
        super.clearPrevExpiryData();
        // fetch expiry
        await super.fetchExpiry()
        // send sns
        await super.sendSNS();
        // await super.sendSQS();
    }
}

module.exports = { OptionWorker };