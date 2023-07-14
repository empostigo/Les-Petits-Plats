import FetchData from "../Api/FetchData.js"
import Card from "../templates/cards.js"
import DataProcessing from "../utils/DataProcessing.js"
import Select from "../templates/select.js"

const recipes = await new FetchData("/data/recipes.json", "recipes").getData()

const nbRecipes = document.getElementById("nbRecipes")
nbRecipes.textContent = `${recipes.length} recettes`

const dom = document.getElementById("cardDom")
dom.innerHTML = "".concat(...recipes.map(r => new Card(r).cardDom()))

const recipeTerms = new DataProcessing(recipes)

const ingredients = new Select("ingredients")
const appliances = new Select("appliances")
const ustensils = new Select("ustensils")

ingredients.fillSelectElement(recipeTerms.wholeRecipesIngredients)
appliances.fillSelectElement(recipeTerms.appliancesList)
ustensils.fillSelectElement(recipeTerms.ustensils)

Select.renderSelect(ingredients, appliances, ustensils)

// DEBUG
