const { Worker } = require("../../Worker/Worker");
const { EXCHANGE_1, EXCHANGE_2 } = require("../../../../../constant");

class OptionWorkerUtils extends Worker {
  constructor(manager, page) {
    super(manager, page);

    this.format = [];
    this.filterDataArray = [];
  }

  async fetchExpiry() {
	const { exchange: EXCHANGE } = this.params;
	const expiryUrls = this.page.getExpiryUrl();

	const results = await Promise.allSettled(expiryUrls.map((expiryUrl) => this.manager.evaluator.fetchInsidePage(EXCHANGE, expiryUrl)));

	this.filterData(results);

	if (this.filterDataArray.length) this.page.insertArray(this.filterDataArray);

	this.filterDataArray = [];
  }

  processData() {
    const { exchange } = this.params;

    switch (exchange) {
      case EXCHANGE_1:
        this.processDataExchangeOne();
        break;
      case EXCHANGE_2:
        this.processDataExchangeTwo();
        break;
      default:
        throw new Error(`❌ Unsupported exchange type: ${exchange}`);
    }

    // debugger
    this.page.buildUrl(this.format);
  }

  // data processor
  processDataExchangeOne() {
    // debugger
    const {
      data: { expiryDates },
      status,
      message
    } = this.result;

    if (status !== 200) throw new Error(`status : ${status} , message : ${message}`);
    else this.format = expiryDates.slice(0, 2);
  }

  processDataExchangeTwo() {
    const {
      data: { Table1 },
      status,
      message
    } = this.result;

    if (status !== 200) throw new Error(`status : ${status} , message : ${message}`);
    else {
      const expiryDates = Table1.map((obj) => obj.ExpiryDate);

      this.format = expiryDates.slice(0, 2);
    }
  }

  filterData(payloadArr) {
    for (let payload of payloadArr) {
      const {
        value: { data, status },
      } = payload;
      if (status === 200) this.filterDataArray.push(data);
    }
  }

  clearPrevExpiryData() {
    this.page.clearExpiry();
  }

}

module.exports = { OptionWorkerUtils };
