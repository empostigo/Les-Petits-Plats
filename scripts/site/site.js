import Search from "../Api/Search.js"
import Card from "../templates/cards.js"
import DataProcessing from "../utils/DataProcessing.js"
import Input from "../utils/input.js"
import Select from "../templates/select.js"

export default class Site {
  constructor(recipes) {
    this.recipes = recipes
    this.searchFun = new Search(this.recipes)

    this.nbRecipes = document.getElementById("nbRecipes")

    this.dom = document.getElementById("cardDom")

    this.recipeTerms = new DataProcessing(this.recipes)

    this.ingredients = new Select("ingredients")
    this.appliances = new Select("appliances")
    this.ustensils = new Select("ustensils")

    this.searchInput = new Input("searchInput")
    this.ingredientsInput = new Input("ingredientsInput")
    this.appliancesInput = new Input("appliancesInput")
    this.ustensilsInput = new Input("ustensilsInput")
  }

  getSearchResults(pattern) {
    const newRecipesArray = this.searchFun.searchResults(pattern)
    this.recipes = newRecipesArray
    this.recipeTerms = new DataProcessing(newRecipesArray)
    this.render()
  }

  listenInputSearchResults(...inputs) {
    inputs.forEach(input => {
      input.inputId.addEventListener("input", content => {
        const re = /^([\p{L}]{3,}( ?[\p{L}]'?[\p{L}]*)*)/u
        if (re.test(content.target.value.trim())) {
          this.getSearchResults(content.target.value)
        }
      })
    })
  }

  listenSelectSearchResults(...selects) {
    selects.forEach(select =>
      select.liIds.forEach(liId => {
        const liIdTag = document.getElementById(liId)
        liIdTag.addEventListener("click", () => {
          this.getSearchResults(liIdTag.textContent)
        })
      })
    )
  }

  render() {
    this.nbRecipes.textContent = `${this.recipes.length} recettes`

    this.dom.innerHTML = "".concat(
      ...this.recipes.map(r => new Card(r).cardDom())
    )

    this.ingredients.fillSelectElement(this.recipeTerms.wholeRecipesIngredients)
    this.appliances.fillSelectElement(this.recipeTerms.appliancesList)
    this.ustensils.fillSelectElement(this.recipeTerms.ustensils)

    this.listenSelectSearchResults(
      this.ingredients,
      this.appliances,
      this.ustensils
    )
  }

  run() {
    this.render()
    Select.enableSelect(this.ingredients, this.appliances, this.ustensils)

    Input.waitForUserEntry(
      this.searchInput,
      this.ingredientsInput,
      this.appliancesInput,
      this.ustensilsInput
    )

    this.listenInputSearchResults(
      this.searchInput,
      this.ingredientsInput,
      this.appliancesInput,
      this.ustensilsInput
    )
  }
}
