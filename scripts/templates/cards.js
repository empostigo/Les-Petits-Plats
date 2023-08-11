// Display a card

export default class Card {
  constructor(cardInfos) {
    this.cardInfos = cardInfos
    this.cardId = `recipe_${this.cardInfos.id}`
    this.cardImg = `/assets/recipes/${this.cardInfos.image}`
    this.modalCard = document.getElementById("modalCard")
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
    const card = document.createElement("article")
    card.id = this.cardId
    card.classList.add("col-12", "col-md-4", "pb-3", "cursor-pointer")
    card.dataset.bsToggle = "modal"
    card.dataset.bsTarget = "#modalCard"

    card.innerHTML = `<div class="card rounded-4">
                <img src="${this.cardImg}" class="card-img-top rounded-top-4 card__img" alt="${this.cardInfos.name}">
                <div class="card-body card__desc">
                  <h2 class="mt-2 mb-4 card__h2">${this.cardInfos.name}</h2>
                  <h3 class="mb-2 card__h3">RECETTE</h3>
                  <p class="overflow-auto mb-4 card__text">${this.cardInfos.description}</p>
                  <h3 class="card__h3">INGRÉDIENTS</h3>
                  <div class="d-flex overflow-auto flex-wrap card__ingredients">
                    ${this.cardIngredients}
                  </div>
                </div>
                <div class="card__time">${this.cardInfos.time}min</div>
              </div>`

    card.addEventListener("click", () => this.getModalCard())

    return card
  }

  getModalCard() {
    const modal = `
        <div class="modal-content rounded-4 border-0 w-75 mx-auto">
          <div class="modal-header p-0 rounded-4">
            <img src="${this.cardImg}" class="card-img-top rounded-top-4 modal__img" alt="${this.cardInfos.name}">
          </div>
          <div class="modal-body modal__desc">
            <h2 class="mt-2 mb-4 modal__h2">${this.cardInfos.name}</h2>
            <h3 class="mb-2 modal__h3">RECETTE</h3>
            <p class="overflow-auto mb-4 modal__text">${this.cardInfos.description}</p>
            <h3 class="modal__h3">INGRÉDIENTS</h3>
            <div class="d-flex overflow-auto flex-wrap">
              ${this.cardIngredients}
            </div>
          </div>
          <div class="modal__time">${this.cardInfos.time}min</div>
          <button class="btn-close opacity-1 mx-auto mb-3 mx-md-0 mb-md-0 modal__close" data-bs-dismiss="modal"></button>
        </div>`

    this.modalCard.innerHTML = modal
  }
}
