const { WorkFlowBuilder } = require("./utils/WorkFlowBuilder");

class WorkFlow extends WorkFlowBuilder {
  constructor(manager, page) {
    super(manager, page);
  }

  async workflow() {
    await super.navigate();
  }
}

module.exports = { WorkFlow };
