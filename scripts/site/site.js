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

    this.displayedTags = []
    this.lastPattern = ""
  }

  getPatternsArray() {
    const patternsArray = [
      {
        pattern: this.mainInput.inputElement.value,
        category: this.mainInput.inputElement.dataset.category
      },
      {
        pattern: this.ingredientsInput.inputElement.value,
        category: this.ingredientsInput.inputElement.dataset.category
      },
      {
        pattern: this.appliancesInput.inputElement.value,
        category: this.appliancesInput.inputElement.dataset.category
      },
      {
        pattern: this.ustensils.inputElement.value,
        category: this.ustensilsInput.inputElement.dataset.category
      }
    ].concat(
      Array.from(document.getElementsByClassName("tags__text")).map(item => ({
        pattern: item.textContent,
        category: item.dataset.category
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
  }

  displaySearchResults() {
    this.getSearchResults()

    this.dom.classList.remove("w-100")
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
          this.lastPattern = content.target.value.trim()
          this.displaySearchResults()
        }

        if (patternLength === 2 && input.inputElement.dataset.searchEnabled) {
          input.inputElement.dataset.searchEnabled = "false"
          this.displaySearchResults()
        }
      })

      input.inputCross.addEventListener("click", () => {
        this.displaySearchResults()
      })
    })
  }

  listenSelectSearchResults(...selects) {
    selects.forEach(select => {
      select.liIds.forEach(liId => {
        const liIdTag = document.getElementById(liId)
        liIdTag.addEventListener("click", () => {
          const tag = new Tags(liIdTag.textContent, liIdTag.dataset.category)
          this.displayedTags.push(tag)
          tag.displayTag()
          this.displaySearchResults()

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
            this.displayedTags.splice(this.displayedTags.indexOf(tag), 1)
            this.displaySearchResults()
          })
        })
      })
    })
  }

  liTagToDisable() {
    this.displayedTags.forEach(tag => {
      const liItem = document.querySelector(
        `[data-li-name="${tag.tag.toLowerCase()}"]`
      )
      if (liItem) {
        liItem.classList.toggle("select__li--selected")
        const closingLi = liItem.lastChild
        closingLi.classList.toggle("opacity-0")

        closingLi.addEventListener("click", event => {
          event.stopPropagation()
          tag.removeTag()
          this.displayedTags.splice(this.displayedTags.indexOf(tag), 1)

          this.displaySearchResults()
        })
      }
    })
  }

  init(...inputs) {
    Input.waitForUserEntry(...inputs)

    this.listenInputSearchResults(...inputs)

    Select.enableSelect(this.ingredients, this.appliances, this.ustensils)
  }

  render() {
    this.nbRecipes.textContent = `${this.recipes.length} recettes`
    if (this.recipes.length === 0) {
      this.dom.classList.add("w-100")
      this.dom.innerHTML = `<p class="text-center cards__norecipes">Aucune recette ne contient \
      «${this.lastPattern}», vous pouvez chercher<br>«tarte aux pommes», «poisson», etc.</div>`
    }

    this.dom.append(...this.recipes.map(recipe => new Card(recipe).cardDom()))

    this.ingredients.fillSelectElement(this.searchEngine.ingredientsSelect)
    this.appliances.fillSelectElement(this.searchEngine.appliancesSelect)
    this.ustensils.fillSelectElement(this.searchEngine.ustensilsSelect)

    this.listenSelectSearchResults(
      this.ingredients,
      this.appliances,
      this.ustensils
    )

    this.liTagToDisable()

    console.log(this.searchEngine.recipeTerms.concatenatedIngredients)
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
