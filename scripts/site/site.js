import Search from "../Api/Search.js"
import Card from "../templates/cards.js"
import Tags from "../templates/tags.js"
import Input from "../templates/input.js"
import Select from "../templates/select.js"

export default class Site {
  constructor(recipes) {
    this.recipes = recipes // recipes array

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

    this.displayedTags = [] // Array to track all selected tags
    this.lastPattern = "" // The last input search
  }

  getPatternsArray() {
    // Create an object array to collect tags and input searches
    // All with their categories (mainInput, ingredientsInputs, etc.)
    // We then run through this array with the search function,
    // i.e. this.searchEngine.getRecipesStructure() to get
    // the corresponding recipes array this.recipes

    const patternsArray = [
      {
        pattern: this.mainInput.sanitize(),
        category: this.mainInput.inputElement.dataset.category
      },
      {
        pattern: this.ingredientsInput.sanitize(),
        category: this.ingredientsInput.inputElement.dataset.category
      },
      {
        pattern: this.appliancesInput.sanitize(),
        category: this.appliancesInput.inputElement.dataset.category
      },
      {
        pattern: this.ustensilsInput.sanitize(),
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
    // Init the Search class object with the original recipes array
    // See Search.js for what is initialized
    this.searchEngine.setRecipesInfos(this.searchEngine.originalRecipes)

    // Matches each pattern with a recipe array, and only keeps the last one,
    // the one that groups all the searches.
    // If it is undefined, it means the user clear all tags/inputs
    // And this.recipes is affected the original recipes array
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

  // Get search results and rendering it
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
        const re = /[</>]/g // Pattern to avoid html injection, used to get the user input
        const pattern = content.target.value.trim().replaceAll(re, "")
        this.lastPattern = pattern
        const patternLength = pattern.length
        if (patternLength > 2) {
          input.inputElement.dataset.searchEnabled = "true" // To enable the search stuff
          this.displaySearchResults()
        }

        if (patternLength <= 2 && input.inputElement.dataset.searchEnabled) {
          input.inputElement.dataset.searchEnabled = "false" // Disable search, so we can trigger line 108
          this.displaySearchResults()
        }
      })

      // When input is cleared, trigger a search
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
          tag.displayTag() // Tags rendering method
          this.displaySearchResults()

          // Reset input fields and hide erasing cross
          selects.forEach(select => {
            select.reset() // Select.reset()
            document
              .getElementById(select.selectIdName.concat("InputCross"))
              .classList.add("opacity-0")
          })

          // Idem for main input
          this.mainInput.reset() // Input.reset()
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

  // Render selects items
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

  // Initialize some part of the page
  init(...inputs) {
    Input.waitForUserEntry(...inputs)

    this.listenInputSearchResults(...inputs)

    Select.enableSelect(this.ingredients, this.appliances, this.ustensils)
  }

  // Called in the beginning, and when recipes array change
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
