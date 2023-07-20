import Search from "../Api/Search.js"
import Site from "../site/site.js"

const recipes = await new Search("/data/recipes.json", "recipes")
const petitsPlats = new Site(recipes.recipes)

petitsPlats.init()
