import Card from "../templates/cards.js"
import FetchData from "../Api/FetchData.js"

const recipes = await new FetchData("/data/recipes.json", "recipes").getData()

const dom = document.getElementById("cardDom")

let cards = ""
for (let r of recipes) {
  const card = new Card(r)
  cards += card.cardDom()
}

dom.innerHTML = cards
