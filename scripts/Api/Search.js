import DataProcessing from "../utils/DataProcessing.js"

export default class Search {
  constructor(recipesData) {
    this.recipesData = recipesData
    this.searchEngine = new DataProcessing()
  }

  searchResults(pattern) {
    console.log(`Search Triggered!\nLooking for ${pattern}`)
    sessionStorage.setItem("Pattern", pattern)
    return []
  }
}
