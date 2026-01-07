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
        // await super.sendSQS();
    }
    
    async workflowCached() {
        // fetch expiry
        await super.fetch()
        super.processData();
        // send sns
        await super.sendSNS();
        // await super.sendSQS();
    }
}

module.exports = { FutureWorker };