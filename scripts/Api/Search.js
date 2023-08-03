import DataProcessing from "../utils/DataProcessing.js"

export default class Search {
  constructor(recipesData) {
    this.recipesData = recipesData
    this.recipeTerms = new DataProcessing()
    this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
    this.appliancesSelect = this.recipeTerms.wholeAppliancesList
    this.ustensilsSelect = this.recipeTerms.wholeUstensilsList
  }

  set ingredientsSelect(ingredients) {
    this._ingredientsSelect = ingredients
  }

  get ingredientsSelect() {
    return this._ingredientsSelect
  }

  searchResults(pattern, category) {
    console.log(
      `Search Triggered!\nLooking for ${pattern} for category ${category}`
    )

    const toFind = pattern.toLowerCase()

    let searchResultsArray = []
    switch (category) {
      case "main":
        searchResultsArray = this.recipesData.filter(
          recipes =>
            recipes.name.toLowerCase().includes(toFind) ||
            recipes.ingredients.some(ingredients =>
              ingredients.ingredient.toLowerCase().includes(toFind)
            ) ||
            recipes.description.includes(toFind)
        )

        break

      case "ingredients":
        searchResultsArray = this.recipesData.filter(recipes =>
          recipes.ingredients.some(ingredients =>
            ingredients.ingredient.toLowerCase().includes(toFind)
          )
        )

        this.ingredientsSelect = searchResultsArray
          .map(recipes =>
            recipes.ingredients
              .map(ingredients => ingredients.ingredient)
              .filter(ingredient => ingredient.includes(toFind))
          )
          .flat()

        console.log(this.ingredientsSelect)
        break

      case "appliances":
        searchResultsArray = this.recipesData.filter(recipes =>
          recipes.appliance.toLowerCase().includes(toFind)
        )
        break

      case "ustensils":
        searchResultsArray = this.recipesData.filter(recipes =>
          recipes.ustensils.some(ustensil =>
            ustensil.toLowerCase().includes(toFind)
          )
        )
        break

      case "tags":
        searchResultsArray = this.recipesData.filter(
          recipes =>
            recipes.ingredients.some(ingredients =>
              ingredients.ingredient.toLowerCase().includes(toFind)
            ) ||
            recipes.appliance.toLowerCase().includes(toFind) ||
            recipes.ustensils.some(ustensil =>
              ustensil.toLowerCase().includes(toFind)
            )
        )

        break

      default:
        break
    }

    console.log(searchResultsArray)
    return searchResultsArray
  }
}
