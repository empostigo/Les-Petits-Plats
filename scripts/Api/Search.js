import FetchData from "./FetchData.js"

export default class Search {
  constructor(recipesUrl, data) {
    if (Search.exists) return Search.instance

    return (async () => {
      this.recipesData = await new FetchData(recipesUrl, data).getData()

      Search.instance = this
      Search.exists = true

      return this
    })()
  }

  set target(str) {
    this._target = str
    console.log(this._target)
  }

  get target() {
    return this._target
  }
}
