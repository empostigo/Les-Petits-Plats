export default class Search {
  set target(str) {
    this._target = str
    console.log(this._target)
  }

  get target() {
    return this._target
  }
}
