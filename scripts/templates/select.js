export default class Select {
  constructor(selectId) {
    this.selectWrapper = document.getElementById("selectWrapper")
    this.selectId = document.getElementById(selectId)

    this.buttonElement = document.getElementById(selectId.concat("Button"))
    this.buttonDown = document.getElementById(selectId.concat("Down"))
    this.buttonUp = document.getElementById(selectId.concat("Up"))

    this.formElement = document.getElementById(selectId.concat("Form"))
    this.inputElement = document.getElementById(selectId.concat("Input"))

    this.ulElement = document.getElementById(selectId.concat("List"))
    this.nbRecipes = document.getElementById("nbRecipes")
  }

  fillSelectElement(itemsArray) {
    const div = document.createElement("div")
    div.classList.add("select__li-wrapper", "px-2")
    this.ulElement.append(div)

    itemsArray.forEach(item => {
      const liItem = document.createElement("li")
      liItem.className = "select__li"
      liItem.textContent = item
      liItem.addEventListener("click", () => console.log(liItem.textContent))
      div.append(liItem)
    })
  }

  dropDownSelect() {
    this.selectId.classList.remove("select--closed")

    this.buttonDown.classList.add("opacity-0")
    this.buttonUp.classList.remove("opacity-0")

    this.formElement.classList.remove("opacity-0")
    this.ulElement.classList.remove("opacity-0")

    this.buttonElement.dataset.state = "opened"
  }

  closeSelect() {
    this.selectId.classList.add("select--closed")

    this.buttonDown.classList.remove("opacity-0")
    this.buttonUp.classList.add("opacity-0")

    this.formElement.classList.add("opacity-0")
    this.ulElement.classList.add("opacity-0")

    this.buttonElement.dataset.state = "closed"
  }

  static renderSelect(...selectElements) {
    selectElements.forEach(element => {
      element.buttonElement.addEventListener("click", () => {
        element.buttonElement.dataset.state === "closed"
          ? element.dropDownSelect()
          : element.closeSelect()
      })

      document.addEventListener("click", event => {
        if (
          event.target !== element.buttonElement &&
          event.target !== element.inputElement
        )
          element.closeSelect()
      })
    })
  }
}
