export default class DataProcessing {
  constructor(recipesArray) {
    this.recipesArray = recipesArray
  }

  // Get ingredients[]
  get ingredientsList() {
    return this.recipesArray.map(recipe =>
      recipe.ingredients.map(i => i.ingredient)
    )
  }

  // split sentences in words array
  get splitIngredient() {
    const re = /(?<='*)[\p{L}]{3,}$/u
    return this.ingredientsList.map(ingredient =>
      ingredient.map(i =>
        i
          .split(" ")
          .filter(expr => expr.match(re))
          // keep "olive" instead of "d'olive"
          .map(i => i.split("'").filter(i => i.match(re)))
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
}
