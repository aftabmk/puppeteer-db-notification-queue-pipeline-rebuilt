const { Worker } = require("../../Worker/Worker");

class EquityWorkerUtils extends Worker {
	constructor(manager,page) {
		super(manager,page);
	}

	processData() {
		const payload = new Array();
		payload.push(this.result);

		this.filterData(payload);
		if (this.filterDataArray.length) 
      		this.page.insertArray(this.filterDataArray);
		
		this.filterDataArray = [];
	}
}

module.exports = { EquityWorkerUtils };