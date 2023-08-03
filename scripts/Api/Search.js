import DataProcessing from "../utils/DataProcessing.js"

export default class Search {
  constructor(recipesData) {
    this.recipesData = recipesData
    this.recipeTerms = new DataProcessing()
    this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
    this.appliancesSelect = this.recipeTerms.wholeAppliancesList
    this.ustensilsSelect = this.recipeTerms.wholeUstensilsList
  }

  getRecipesStructure(pattern, category) {
    const toFind = pattern.toLowerCase()
    const searchResultsArray = this.searchResults(toFind, category)

    this.recipesData = searchResultsArray
    this.recipeTerms.recipesArray = searchResultsArray

    switch (category) {
      case "main":
      case "appliances":
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
        this.appliancesSelect = this.recipeTerms.wholeAppliancesList
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList

        break

      case "ingredients":
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList.filter(
          element => element.includes(toFind)
        )

        this.appliancesSelect = this.recipeTerms.wholeAppliancesList
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList

        break

      case "ustensils":
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList.filter(
          element => element.includes(toFind)
        )

        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
        this.appliancesSelect = this.recipeTerms.wholeAppliancesList

        break

      default:
        break
    }

    return searchResultsArray
  }

  searchResults(pattern, category) {
    console.log(
      `Search Triggered!\nLooking for ${pattern} for category ${category}`
    )

    let searchResultsArray = []
    switch (category) {
      case "main":
        searchResultsArray = this.recipesData.filter(
          recipes =>
            recipes.name.toLowerCase().includes(pattern) ||
            recipes.ingredients.some(ingredients =>
              ingredients.ingredient.toLowerCase().includes(pattern)
            ) ||
            recipes.description.includes(pattern)
        )

        break

      case "ingredients":
        searchResultsArray = this.recipesData.filter(recipes =>
          recipes.ingredients.some(ingredients =>
            ingredients.ingredient.toLowerCase().includes(pattern)
          )
        )

        break

      case "appliances":
        searchResultsArray = this.recipesData.filter(recipes =>
          recipes.appliance.toLowerCase().includes(pattern)
        )
        break

      case "ustensils":
        searchResultsArray = this.recipesData.filter(recipes =>
          recipes.ustensils.some(ustensil =>
            ustensil.toLowerCase().includes(pattern)
          )
        )
        break

      case "tags":
        searchResultsArray = this.recipesData.filter(
          recipes =>
            recipes.ingredients.some(ingredients =>
              ingredients.ingredient.toLowerCase().includes(pattern)
            ) ||
            recipes.appliance.toLowerCase().includes(pattern) ||
            recipes.ustensils.some(ustensil =>
              ustensil.toLowerCase().includes(pattern)
            )
        )

        break

      default:
        break
    }

    return searchResultsArray
  }
}
