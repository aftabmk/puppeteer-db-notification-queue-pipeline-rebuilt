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
        console.log("skip sns sending");
        // await super.sendSNS();
    }
    
    async workflowCached() {
        super.clearPrevExpiryData();
        // fetch expiry
        await super.fetchExpiry()
        // send sns
        console.log("skip sns sending");
        // await super.sendSNS();
    }
}

module.exports = { OptionWorker };