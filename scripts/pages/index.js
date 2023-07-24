import recipes from "../../data/recipes.js"
import Site from "../site/site.js"

const recipesData = JSON.parse(JSON.stringify(recipes))
sessionStorage.setItem("original", JSON.stringify(recipes))

const petitsPlats = new Site(recipesData)
petitsPlats.run()
