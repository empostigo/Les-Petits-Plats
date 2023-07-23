import recipes from "../../data/recipes.js"
import Site from "../site/site.js"

const recipesData = JSON.parse(JSON.stringify(recipes))
Object.keys(recipesData).forEach(item =>
  sessionStorage.setItem(item, JSON.stringify(recipes[item]))
)

const petitsPlats = new Site(recipesData)
petitsPlats.run()
