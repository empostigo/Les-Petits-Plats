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

  render() {
    this.nbRecipes.textContent = `${this.recipes.length} recettes`

    this.dom.innerHTML = "".concat(
      ...this.recipes.map(r => new Card(r).cardDom())
    )

    this.ingredients.fillSelectElement(this.recipeTerms.wholeRecipesIngredients)
    this.appliances.fillSelectElement(this.recipeTerms.appliancesList)
    this.ustensils.fillSelectElement(this.recipeTerms.ustensils)

    Select.renderSelect(this.ingredients, this.appliances, this.ustensils)
  }

  run() {
    this.render()

    Input.waitForUserEntry(
      this.searchInput,
      this.ingredientsInput,
      this.appliancesInput,
      this.ustensilsInput
    )
  }
}
