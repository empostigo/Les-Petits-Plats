export default class Search {
  constructor(recipesData) {
    if (Search.exists) return Search.instance

    this.recipesData = recipesData

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
