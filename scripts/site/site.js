import Search from "../Api/Search.js"
import Card from "../templates/cards.js"
import Tags from "../templates/tags.js"
import Input from "../templates/input.js"
import Select from "../templates/select.js"

export default class Site {
  constructor(recipes) {
    this.originalRecipes = recipes // Original recipes array backup
    this.recipes = recipes.sort((a, b) => a.name > b.name)

    this.nbRecipes = document.getElementById("nbRecipes")

    this.dom = document.getElementById("cardDom") // cards parent element

    this.searchEngine = new Search(this.recipes)

    this.ingredients = new Select("ingredients")
    this.appliances = new Select("appliances")
    this.ustensils = new Select("ustensils")

    this.mainInput = new Input("mainInput")
    this.ingredientsInput = new Input("ingredientsInput")
    this.appliancesInput = new Input("appliancesInput")
    this.ustensilsInput = new Input("ustensilsInput")

    this.selectTags = []
  }

  getSearchResults(pattern, category) {
    this.recipes = this.searchEngine.getRecipesStructure(pattern, category)
    this.dom.innerHTML = ""
    this.render()
  }

  listenInputSearchResults(...inputs) {
    inputs.forEach(input => {
      let previousRecipesArray = []
      input.inputElement.addEventListener("input", content => {
        if (content.target.value.trim().length > 2) {
          previousRecipesArray = this.recipes
          this.getSearchResults(
            content.target.value,
            content.target.dataset.category
          )
        }
        /*
        if (content.target.value.trim().length > 0) {
          this.searchEngine.setRecipesInfos(previousRecipesArray)
          this.getSearchResults(
            content.target.value,
            content.target.dataset.category
          )
        }
        */
      })
    })
  }

  listenSelectSearchResults(...selects) {
    selects.forEach(select =>
      select.liIds.forEach(liId => {
        const liIdTag = document.getElementById(liId)
        liIdTag.addEventListener("click", () => {
          this.selectTags.push(liIdTag.dataset.name)
          this.getSearchResults(liIdTag.textContent, liIdTag.dataset.category)
          const tag = new Tags(liIdTag.textContent, liIdTag.dataset.category)
          tag.displayTag()

          selects.forEach(select => {
            select.inputElement.value = ""
            document
              .getElementById(select.selectIdName.concat("InputCross"))
              .classList.add("opacity-0")
          })

          this.mainInput.inputElement.value = ""
          this.mainInput.inputCross.classList.add("opacity-0")

          const closingTag = document.getElementById(tag.closingTagId)
          closingTag.addEventListener("click", () => {
            this.selectTags.splice(
              this.selectTags.indexOf(liIdTag.dataset.name),
              1
            )
            this.searchEngine.setRecipesInfos(this.originalRecipes)
            const tags = document.getElementsByClassName("tags__text")
            if (tags.length) {
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

    this.dom.append(...this.recipes.map(recipe => new Card(recipe).cardDom()))

    this.ingredients.fillSelectElement(this.searchEngine.ingredientsSelect)
    this.appliances.fillSelectElement(this.searchEngine.appliancesSelect)
    this.ustensils.fillSelectElement(this.searchEngine.ustensilsSelect)

    this.listenSelectSearchResults(
      this.ingredients,
      this.appliances,
      this.ustensils
    )

    if (this.selectTags.length)
      this.selectTags.forEach(dataset =>
        document
          .querySelector(`[data-name="${dataset}"]`)
          .classList.add("select__li--selected")
      )
  }

  run() {
    this.init(
      this.mainInput,
      this.ingredientsInput,
      this.appliancesInput,
      this.ustensilsInput
    )
    this.render()
  }
}
