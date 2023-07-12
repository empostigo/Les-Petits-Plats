export default class Select {
  constructor(selectId) {
    this.selectWrapper = document.getElementById("selectWrapper")
    this.selectId = document.getElementById(selectId)

    this.buttonElement = document.getElementById(selectId.concat("Button"))
    this.buttonDown = document.getElementById(selectId.concat("Down"))
    this.buttonUp = document.getElementById(selectId.concat("Up"))

    this.formElement = document.getElementById(selectId.concat("Form"))
    this.ulElement = document.getElementById(selectId.concat("List"))
    this.nbRecipes = document.getElementById("nbRecipes")
  }

  fillSelectElement(itemsArray) {
    const div = document.createElement("div")
    div.classList.add("select__li-wrapper", "px-2")
    this.ulElement.append(div)

    const liElements = itemsArray
      .map(item => `<li class="select__li">${item}</li>`)
      .join("\n")
    div.insertAdjacentHTML("beforeEnd", liElements)
  }

  dropDownSelect() {
    this.selectId.classList.remove("select--closed")

    this.buttonDown.classList.add("opacity-0")
    this.buttonUp.classList.remove("opacity-0")

    this.formElement.classList.remove("opacity-0")
    this.ulElement.classList.remove("opacity-0")
  }

  closeSelect() {
    this.selectId.classList.add("select--closed")

    this.buttonDown.classList.remove("opacity-0")
    this.buttonUp.classList.add("opacity-0")

    this.formElement.classList.add("opacity-0")
    this.ulElement.classList.add("opacity-0")
  }

  static renderSelect(...selectElements) {
    for (let element of selectElements) {
      let flag = 0
      element.buttonElement.addEventListener("click", () => {
        flag++ % 2 === 0 ? element.dropDownSelect() : element.closeSelect()
      })
    }
  }
}
