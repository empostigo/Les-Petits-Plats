export default class Select {
  constructor(selectId) {
    this.selectIdName = selectId
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
  }

  set liIds(liIds) {
    this._liIds = liIds
  }

  get liIds() {
    return this._liIds
  }

  fillSelectElement(itemsArray) {
    this.ulElement.innerHTML = ""

    const div = document.createElement("div")
    div.classList.add("select__li-wrapper", "px-2")
    this.ulElement.append(div)

    let idNumber = 0
    const liIdsArray = []
    itemsArray.forEach(item => {
      const liItem = document.createElement("li")
      liItem.className = "select__li"
      liItem.id = `${this.selectIdName}LiItem${idNumber++}`
      liItem.textContent = item
      liItem.dataset.category = "tags"

      liIdsArray.push(liItem.id)
      div.append(liItem)
    })

    this.liIds = liIdsArray
  }

  toggleSelect() {
    this.selectId.classList.toggle("select--closed")

    this.buttonDown.classList.toggle("opacity-0")
    this.buttonUp.classList.toggle("opacity-0")

    this.formElement.classList.toggle("opacity-0")
    this.ulElement.classList.toggle("opacity-0")
  }

  closeSelect() {
    this.selectId.classList.add("select--closed")

    this.buttonDown.classList.remove("opacity-0")
    this.buttonUp.classList.add("opacity-0")

    this.formElement.classList.add("opacity-0")
    this.ulElement.classList.add("opacity-0")
  }

  static enableSelect(...selectElements) {
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
