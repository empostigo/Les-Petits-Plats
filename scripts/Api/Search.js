import DataProcessing from "../utils/DataProcessing.js"

export default class Search {
  constructor(recipesData) {
    this.recipesData = recipesData
    this.recipeTerms = new DataProcessing(this.recipesData)
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

      case "ingredientsTags":
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList.filter(
          ingredient => ingredient === pattern
        )

        this.appliancesSelect = this.recipeTerms.wholeAppliancesList
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList

        break

      case "appliancesTags":
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList

        this.appliancesSelect = this.recipeTerms.wholeAppliancesList.filter(
          appliance => appliance.toLowerCase() === toFind
        )

        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList

        break

      case "ustensilsTags":
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
        this.appliancesSelect = this.recipeTerms.wholeAppliancesList

        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList.filter(
          ustensil => ustensil.toLowerCase() === toFind
        )

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
          recipe =>
            recipe.name.toLowerCase().includes(pattern) ||
            recipe.ingredients.some(ingredients =>
              ingredients.ingredient.toLowerCase().includes(pattern)
            ) ||
            recipe.description.includes(pattern)
        )

        break

      case "ingredients":
        searchResultsArray = this.recipesData.filter(recipe =>
          recipe.ingredients.some(ingredients =>
            ingredients.ingredient.toLowerCase().includes(pattern)
          )
        )

        break

      case "appliances":
        searchResultsArray = this.recipesData.filter(recipe =>
          recipe.appliance.toLowerCase().includes(pattern)
        )
        break

      case "ustensils":
        searchResultsArray = this.recipesData.filter(recipe =>
          recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase().includes(pattern)
          )
        )
        break

      case "ingredientsTags":
        searchResultsArray = this.recipesData.filter(recipe =>
          recipe.ingredients.some(
            object => object.ingredient.toLowerCase() === pattern
          )
        )

        break

      case "appliancesTags":
        searchResultsArray = this.recipesData.filter(
          recipe => recipe.appliance.toLowerCase() === pattern
        )
        break

      case "ustensilsTags":
        searchResultsArray = this.recipesData.filter(recipe =>
          recipe.ustensils.some(ustensil => ustensil.toLowerCase() === pattern)
        )

      default:
        break
    }

    return searchResultsArray
  }
}
