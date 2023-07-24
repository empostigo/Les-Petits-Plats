export default class Search {
  constructor(recipesData) {
    this.recipesData = recipesData
  }

  searchResults(pattern) {
    console.log(`Search Triggered!\nLooking for ${pattern}`)
    sessionStorage.setItem("Pattern", pattern)
    return this.recipesData
  }
}
