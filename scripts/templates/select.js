export default class Select {
  constructor(selectId) {
    this.selectWrapper = document.getElementById("selectWrapper")
    this.selectId = document.getElementById(selectId)
    this.buttonElement = document.getElementById(selectId.concat("Button"))
    this.formElement = document.getElementById(selectId.concat("Form"))
    this.ulElement = document.getElementById(selectId.concat("List"))
    this.nbRecipes = document.getElementById("nbRecipes")
  }

  fillSelectElement(itemsArray) {
    const div = document.createElement("div")
    div.className = "select__li-wrapper"
    this.ulElement.append(div)

    const liElements = itemsArray
      .map(item => `<li class="select__li">${item}</li>`)
      .join("\n")
    div.insertAdjacentHTML("beforeEnd", liElements)
  }

  dropDownSelect() {
    this.selectId.classList.remove("select--closed")
    this.formElement.classList.remove("d-none")
    this.ulElement.classList.remove("d-none")
  }

  closeSelect() {
    this.selectId.classList.add("select--closed")
    this.formElement.classList.add("d-none")
    this.ulElement.classList.add("d-none")
  }

  static renderSelect(...selectElements) {
    for (let element of selectElements) {
      let flag = 0
      element.buttonElement.addEventListener("click", () =>
        flag++ % 2 === 0 ? element.dropDownSelect() : element.closeSelect()
      )
    }
  }
}
