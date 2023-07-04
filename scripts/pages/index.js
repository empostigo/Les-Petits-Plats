import Card from "../templates/cards.js"
import FetchData from "../Api/FetchData.js"

const recipes = await new FetchData("/data/recipes.json", "recipes").getData()

const dom = document.getElementById("cardDom")
dom.innerHTML = "".concat(...recipes.map(r => new Card(r).cardDom()))
