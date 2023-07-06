import FetchData from "../Api/FetchData.js"
import Card from "../templates/cards.js"
import DataProcessing from "../utils/DataProcessing.js"

const recipes = await new FetchData("/data/recipes.json", "recipes").getData()

const dom = document.getElementById("cardDom")
dom.innerHTML = "".concat(...recipes.map(r => new Card(r).cardDom()))

// DEBUG
const ingredients = new DataProcessing(recipes).concatenatedIngredients
console.log(ingredients)
