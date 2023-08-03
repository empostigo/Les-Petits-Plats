import Search from "../Api/Search.js"
import Card from "../templates/cards.js"
import Tags from "../templates/tags.js"
import DataProcessing from "../utils/DataProcessing.js"
import Input from "../utils/input.js"
import Select from "../templates/select.js"

export default class Site {
  constructor(recipes) {
    this.recipes = recipes

    this.nbRecipes = document.getElementById("nbRecipes")

    this.dom = document.getElementById("cardDom")

    this.recipeTerms = new DataProcessing(this.recipes)
    this.searchEngine = new Search(this.recipes)

    this.ingredients = new Select("ingredients")
    this.appliances = new Select("appliances")
    this.ustensils = new Select("ustensils")

    this.searchInput = new Input("searchInput")
    this.ingredientsInput = new Input("ingredientsInput")
    this.appliancesInput = new Input("appliancesInput")
    this.ustensilsInput = new Input("ustensilsInput")
  }

  getSearchResults(pattern, category) {
    const newRecipesArray = this.searchEngine.searchResults(pattern, category)
    this.recipes = newRecipesArray
    this.recipeTerms.recipesArray = newRecipesArray
    this.searchEngine.recipesData = newRecipesArray
    this.render()
  }

  listenInputSearchResults(...inputs) {
    inputs.forEach(input => {
      input.inputId.addEventListener("input", content => {
        const re = /^([\p{L}]{3,}( ?[\p{L}]'?[\p{L}]*)*)/u
        if (re.test(content.target.value.trim())) {
          this.getSearchResults(
            content.target.value,
            content.target.dataset.category
          )
        }
      })
    })
  }

  listenSelectSearchResults(...selects) {
    selects.forEach(select =>
      select.liIds.forEach(liId => {
        const liIdTag = document.getElementById(liId)
        liIdTag.addEventListener("click", () => {
          this.getSearchResults(liIdTag.textContent, liIdTag.dataset.category)
          const tag = new Tags(liIdTag.textContent)
          tag.displayTag()
        })
      })
    )
  }

  render() {
    this.nbRecipes.textContent = `${this.recipes.length} recettes`

    this.dom.innerHTML = "".concat(
      ...this.recipes.map(r => new Card(r).cardDom())
    )

    this.ingredients.fillSelectElement(this.searchEngine.ingredientsSelect)
    this.appliances.fillSelectElement(this.searchEngine.appliancesSelect)
    this.ustensils.fillSelectElement(this.searchEngine.ustensilsSelect)

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
