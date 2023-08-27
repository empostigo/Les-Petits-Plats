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

  // split sentences in words array
  get splitIngredient() {
    const re = /((?<='?)[\p{L}](?!\){1})){3,}/u
    return this.ingredientsList.map(ingredient =>
      ingredient.map(i =>
        i
          .split(" ")
          .filter(expr => expr.match(re))
          // keep "olive" instead of "d'olive"
          .map(i => i.split("'").filter(i => i.match(re)))
          .flat()
          .map(i => i.split(")").filter(i => i.match(re)))
          .flat()
      )
    )
  }

  // create a unique ingredient list array for every recipe
  // with ingredients words
  get concatenatedIngredients() {
    return (
      this.splitIngredient
        .map(ingredientArray => ingredientArray.flat())
        // remove duplicates
        .map(i => [...new Set(i)])
    )
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
          .map(u => u.toLowerCase())
      )
    ].sort()
  }
}
