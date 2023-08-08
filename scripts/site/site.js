import Search from "../Api/Search.js"
import Card from "../templates/cards.js"
import Tags from "../templates/tags.js"
import Input from "../templates/input.js"
import Select from "../templates/select.js"

export default class Site {
  constructor(recipes) {
    this.originalRecipes = recipes // Original recipes array backup
    this.recipes = recipes

    this.nbRecipes = document.getElementById("nbRecipes")

    this.dom = document.getElementById("cardDom") // cards parent element

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
    this.recipes = this.searchEngine.getRecipesStructure(pattern, category)
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
          const tag = new Tags(liIdTag.textContent, liIdTag.dataset.category)
          tag.displayTag()

          const closingTag = document.getElementById(tag.closingTagId)
          closingTag.addEventListener("click", () => {
            this.searchEngine.setRecipesInfos(this.originalRecipes)
            const tags = document.getElementsByClassName("tags__text")
            if (tags.length > 0) {
              Array.from(tags).forEach(element => {
                this.getSearchResults(
                  element.textContent,
                  element.dataset.category
                )
              })
            } else {
              this.recipes = this.originalRecipes
              this.searchEngine.ingredientsSelect =
                this.searchEngine.recipeTerms.wholeIngredientsList
              this.searchEngine.appliancesSelect =
                this.searchEngine.recipeTerms.wholeAppliancesList
              this.searchEngine.ustensilsSelect =
                this.searchEngine.recipeTerms.wholeUstensilsList
              this.render()
            }
          })
        })
      })
    )
  }

  init(...inputs) {
    Input.waitForUserEntry(...inputs)

    this.listenInputSearchResults(...inputs)

    Select.enableSelect(this.ingredients, this.appliances, this.ustensils)
  }

  render() {
    this.nbRecipes.textContent = `${this.recipes.length} recettes`

    this.dom.append(
      ...this.recipes.map(recipe => new Card(recipe).cardDom("cursor-pointer"))
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
    this.init(
      this.searchInput,
      this.ingredientsInput,
      this.appliancesInput,
      this.ustensilsInput
    )
    this.render()
  }
}
