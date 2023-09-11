export default class DataProcessing {
  constructor(recipesArray) {
    this.recipesArray = recipesArray
  }

  // Get ingredients[] for every recipe
  get ingredientsList() {
    return this.recipesArray.map(recipe =>
      recipe.ingredients
        .map(ingredient => ingredient.ingredient)
        .map(i => i.toLowerCase())
    )
  }

  // get all recipes ingredients in a unique array (displayed in select#ingredients)
  get wholeIngredientsList() {
    return [...new Set(this.ingredientsList.flat())].sort()
  }

  // get all recipes appliances list (displayed in select#appliances)
  get wholeAppliancesList() {
    return [
      ...new Set(this.recipesArray.map(recipe => recipe.appliance))
    ].sort()
  }

  // get all recipes ustensils list (displayed in select#ustensils)
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
