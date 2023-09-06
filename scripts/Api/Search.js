import DataProcessing from "../utils/DataProcessing.js"

export default class Search {
  constructor(recipesData) {
    this.originalRecipes = recipesData
    this.recipesData = recipesData
    this.recipeTerms = new DataProcessing(this.recipesData)
    this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
    this.appliancesSelect = this.recipeTerms.wholeAppliancesList
    this.ustensilsSelect = this.recipeTerms.wholeUstensilsList
  }

  getOriginalStructure() {
    this.setRecipesInfos(this.originalRecipes)
    this.setSelectItems()

    return this.originalRecipes
  }

  getRecipesStructure(pattern, category) {
    const toFind = pattern.toLowerCase()
    const searchResultsArray = this.searchResults(toFind, category)

    this.setRecipesInfos(searchResultsArray)
    this.setSelectItems(toFind, category)

    return searchResultsArray
  }

  setRecipesInfos(recipesArray) {
    this.recipesData = recipesArray
    this.recipeTerms.recipesArray = recipesArray
  }

  setSelectItems(pattern = "", category = "") {
    switch (category) {
      case "ingredients":
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList.filter(
          element => element.includes(pattern)
        )

        this.appliancesSelect = this.recipeTerms.wholeAppliancesList
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList

        break

      case "ustensils":
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList.filter(
          element => element.includes(pattern)
        )

        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
        this.appliancesSelect = this.recipeTerms.wholeAppliancesList

        break

      default:
        this.ingredientsSelect = this.recipeTerms.wholeIngredientsList
        this.appliancesSelect = this.recipeTerms.wholeAppliancesList
        this.ustensilsSelect = this.recipeTerms.wholeUstensilsList

        break
    }
  }

  searchResults(pattern, category) {
    let searchResultsArray = []
    switch (category) {
      case "main":
        searchResultsArray = this.recipesData.filter(
          recipe =>
            recipe.name.toLowerCase().includes(pattern) ||
            recipe.description.includes(pattern) ||
            recipe.ingredients.some(ingredients =>
              ingredients.ingredient.toLowerCase().includes(pattern)
            )
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

        break

      default:
        searchResultsArray = this.originalRecipes
        break
    }

    return searchResultsArray
  }
}
