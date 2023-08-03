export default class DataProcessing {
  constructor(recipesArray) {
    if (DataProcessing.exists) {
      return DataProcessing.instance
    }

    this.recipesArray = recipesArray

    DataProcessing.exists = true
    DataProcessing.instance = this

    return this
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
    return [...new Set(this.ingredientsList.flat())]
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
    return [...new Set(this.recipesArray.map(recipe => recipe.appliance))]
  }

  get concatenatedAppliances() {
    return this.appliancesList.map(appliance =>
      appliance
        .split(" ")
        .filter(a => a.length > 2)
        .flat()
    )
  }

  get wholeUstensilsList() {
    return [
      ...new Set(
        this.recipesArray
          .map(recipe => recipe.ustensils)
          .flat()
          .map(u => u.toLowerCase())
      ),
    ]
  }

  get ustensilsList() {
    return [
      ...new Set(
        this.recipesArray.map(recipe =>
          recipe.ustensils
            .map(ustensil => ustensil.split(" ").filter(u => u.length > 2))
            .flat()
        )
      ),
    ]
  }

  get allRecipeTerms() {
    return this.concatenatedIngredients
      .map((item, index) =>
        item.concat(
          this.concatenatedAppliances[index],
          this.ustensilsList[index]
        )
      )
      .map(i => [...new Set(i)])
      .map(i => i.sort((a, b) => a.toUpperCase() > b.toUpperCase()))
  }
}
