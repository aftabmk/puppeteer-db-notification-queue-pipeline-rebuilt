const { FutureWorkerUtils } = require("./utils/FutureWorkerUtils");

class FutureWorker extends FutureWorkerUtils {
    constructor(manager,page) {
        super(manager,page);
    }

    async workflow() {
        // navigate
        await super.navigate()
        // get fetch
        await super.fetch();
        super.processData();
        // send sns
        await super.sendSNS();
    }
    
    async workflowCached() {
        // fetch expiry
        await super.fetch()
        super.processData();
        // send sns
        await super.sendSNS();
    }
}

module.exports = { FutureWorker };