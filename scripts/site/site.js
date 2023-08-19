import Search from "../Api/Search.js"
import Card from "../templates/cards.js"
import Tags from "../templates/tags.js"
import Input from "../templates/input.js"
import Select from "../templates/select.js"

export default class Site {
  constructor(recipes) {
    this.recipes = recipes

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
  }

  getPatternsArray() {
    const patternsArray = [
      {
        pattern: this.mainInput.inputElement.value,
        category: this.mainInput.inputElement.dataset.category,
      },
      {
        pattern: this.ingredientsInput.inputElement.value,
        category: this.ingredientsInput.inputElement.dataset.category,
      },
      {
        pattern: this.appliancesInput.inputElement.value,
        category: this.appliancesInput.inputElement.dataset.category,
      },
      {
        pattern: this.ustensils.inputElement.value,
        category: this.ustensilsInput.inputElement.dataset.category,
      },
    ].concat(
      Array.from(document.getElementsByClassName("tags__text")).map(item => ({
        pattern: item.textContent,
        category: item.dataset.category,
      }))
    )

    return patternsArray
  }

  getSearchResults() {
    this.searchEngine.setRecipesInfos(this.searchEngine.originalRecipes)
    this.recipes =
      this.getPatternsArray()
        .filter(element => element.pattern.length > 2)
        .map(pattern =>
          this.searchEngine.getRecipesStructure(
            pattern.pattern,
            pattern.category
          )
        )
        .pop() ?? this.searchEngine.getOriginalStructure()

    this.dom.innerHTML = ""
    this.render()
  }

  renderOriginalPage() {
    this.recipes = this.searchEngine.getOriginalStructure()
    this.dom.innerHTML = ""
    this.render()
  }

  listenInputSearchResults(...inputs) {
    inputs.forEach(input => {
      input.inputElement.addEventListener("input", content => {
        const patternLength = content.target.value.trim().length
        if (patternLength > 2) {
          input.inputElement.dataset.searchEnabled = "true"
          this.getSearchResults()
        }

        if (patternLength === 2 && input.inputElement.dataset.searchEnabled) {
          input.inputElement.dataset.searchEnabled = "false"
          this.getSearchResults()
        }
      })

      input.inputCross.addEventListener("click", () => {
        this.getSearchResults()
      })
    })
  }

  listenSelectSearchResults(...selects) {
    selects.forEach(select =>
      select.liIds.forEach(liId => {
        const liIdTag = document.getElementById(liId)
        liIdTag.addEventListener("click", () => {
          const tag = new Tags(liIdTag.textContent, liIdTag.dataset.category)
          tag.displayTag()
          this.getSearchResults()

          selects.forEach(select => {
            select.reset()
            document
              .getElementById(select.selectIdName.concat("InputCross"))
              .classList.add("opacity-0")
          })

          this.mainInput.reset()
          this.mainInput.inputCross.classList.add("opacity-0")

          const closingTag = document.getElementById(tag.closingTagId)
          closingTag.addEventListener("click", () => {
            this.getSearchResults()
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

    const liToDisable = Array.from(
      document.getElementsByClassName("tags__text")
    )

    if (liToDisable.length) {
      liToDisable.forEach(tag => {
        const liItem = document.querySelector(
          `[data-name="${tag.textContent.toLowerCase()}"]`
        )
        if (liItem) liItem.classList.add("select__li--selected")
      })
    }
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
