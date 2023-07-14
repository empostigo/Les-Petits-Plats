import FetchData from "../Api/FetchData.js"
import Site from "../site/site.js"

const recipes = await new FetchData("/data/recipes.json", "recipes").getData()
const petitsPlats = new Site(recipes)

petitsPlats.init()
