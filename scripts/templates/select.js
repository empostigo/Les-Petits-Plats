import DataProcessing from "../utils/DataProcessing.js"

export default class Select {
  constructor(selectId) {
    this.selectId = selectId
  }

  set itemsList(itemsArray) {
    this.itemsList = itemsArray
  }

  get itemsList() {
    return this.selectId.concat("List")
  }
}
