export default class DataProcessing {
  constructor(recipesArray) {
    this.recipesArray = recipesArray
  }

  // Get ingredients[]
  get ingredientsList() {
    return this.recipesArray.map(recipe =>
      recipe.ingredients
        .map(ingredient => ingredient.ingredient)
        .map(i => i.toLowerCase())
    )
  }

  // Get all recipes ingredients in a unique array
  get wholeIngredientsList() {
    return [...new Set(this.ingredientsList.flat())].sort()
  }

  // get appliances list ([])
  get wholeAppliancesList() {
    return [
      ...new Set(this.recipesArray.map(recipe => recipe.appliance))
    ].sort()
  }

  get wholeUstensilsList() {
    return [
      ...new Set(
        this.recipesArray
          .map(recipe => recipe.ustensils)
          .flat()
          .map(ustensil => ustensil.toLowerCase())
      )
    ].sort()
  }
}
