// Display a card

export default class Card {
  constructor(cardInfos) {
    this.cardInfos = cardInfos
    this.ingredientsArray = this.cardInfos.ingredients.map(
      i => `<div class="col-6">
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
                <div class="card-body card__desc">
                  <h2 class="card-title mt-2 mb-4 card__h2">${this.cardInfos.name}</h2>
                  <h3 class="mb-2 card__h3">RECETTE</h3>
                  <p class="overflow-auto mb-4 card__text">${this.cardInfos.description}</p>
                  <h3 class="card__h3">INGRÉDIENTS</h3>
                  <div class="d-flex overflow-auto flex-wrap card__ingredients">
                    ${this.cardIngredients}
                  </div>
                </div>
                <div class="card__time">${this.cardInfos.time}min</div>
              </div>
            </div>`
  }
}
