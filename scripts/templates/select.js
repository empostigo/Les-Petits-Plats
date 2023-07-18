import Search from "../Api/Search.js"

export default class Select {
  constructor(selectId) {
    this.selectWrapper = document.getElementById("selectWrapper")
    this.selectId = document.getElementById(selectId)

    this.buttonElement = document.getElementById(selectId.concat("Button"))
    this.buttonDown = document.getElementById(selectId.concat("Down"))
    this.buttonUp = document.getElementById(selectId.concat("Up"))

    this.formElement = document.getElementById(selectId.concat("Form"))
    this.inputElement = document.getElementById(selectId.concat("Input"))
    this.inputCrossElement = document.getElementById(
      selectId.concat("InputCross")
    )

    this.ulElement = document.getElementById(selectId.concat("List"))

    this.searchFun = new Search()
  }

  fillSelectElement(itemsArray) {
    const div = document.createElement("div")
    div.classList.add("select__li-wrapper", "px-2")
    this.ulElement.append(div)

    itemsArray.forEach(item => {
      const liItem = document.createElement("li")
      liItem.className = "select__li"
      liItem.textContent = item
      liItem.addEventListener("click", () => {
        this.searchFun.target = liItem.textContent
      })
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

  toggleSelect() {
    this.buttonElement.dataset.state === "closed"
      ? this.dropDownSelect()
      : this.closeSelect()
  }

  static renderSelect(...selectElements) {
    selectElements.forEach(element => {
      element.buttonElement.addEventListener("click", () =>
        element.toggleSelect()
      )

      document.addEventListener("click", event => {
        if (
          event.target !== element.buttonElement &&
          event.target !== element.inputElement &&
          event.target !== element.inputCrossElement
        )
          element.closeSelect()
      })
    })
  }
}
