export default class Search {
  constructor() {
    if (Search.exists) return Search.instance

    Search.instance = this
    Search.exists = true

    return this
  }

  set target(str) {
    this._target = str
    console.log(this._target)
  }

  get target() {
    return this._target
  }
}
