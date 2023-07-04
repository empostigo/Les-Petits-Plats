// Display a card

export default class Card {
  constructor(cardInfos) {
    this.cardInfos = cardInfos
    this.ingredientsArray = this.cardInfos.ingredients.map(
      i => `<div class="col-6 card__ingredients">
              <h4 class="card__h4">${i.ingredient}</h4>
              <p class="card__quantity">
                ${i.quantity ? i.quantity : ""} ${i.unit ? i.unit : ""}
              </p>
            </div>`
    )
  }

  get cardIngredients() {
    return "".concat(...this.ingredientsArray)
  }

  cardDom() {
    return `<div class="col-12 col-md-4 pb-3">
              <div class="card rounded-4">
                <img src="/assets/recipes/${this.cardInfos.image}" class="card-img-top rounded-top-4 card__img" alt="${this.cardInfos.name}">
                <div class="card-body card__desc overflow-auto">
                  <h2 class="card-title mt-2 mb-4 card__h2">${this.cardInfos.name}</h2>
                  <h3 class="card__h3 mb-2">RECETTE</h3>
                  <p class="card__text mb-4">${this.cardInfos.description}</p>
                  <h3 class="card__h3">INGRÉDIENTS</h3>
                  <div class="d-flex flex-wrap">
                    ${this.cardIngredients}
                  </div>
                </div>
              </div>
            </div>`
  }
}
