export default class Select {
  constructor(selectId) {
    this.selectIdName = selectId // Used to create ids
    this.selectWrapper = document.getElementById("selectWrapper") // div container for selects
    this.selectId = document.getElementById(selectId) // The select element

    // Select element structure
    this.buttonElement = document.getElementById(selectId.concat("Button"))
    this.buttonDown = document.getElementById(selectId.concat("Down"))
    this.buttonUp = document.getElementById(selectId.concat("Up"))
    this.formElement = document.getElementById(selectId.concat("InputForm"))
    this.inputElement = document.getElementById(selectId.concat("Input"))
    this.inputCrossElement = document.getElementById(
      selectId.concat("InputCross")
    )

    this.ulElement = document.getElementById(selectId.concat("List"))
  }

  // Keep track of <li> in selects
  set liIds(liIds) {
    this._liIds = liIds
  }

  get liIds() {
    return this._liIds
  }

  // And <li> closing cross
  set liClosingIds(id) {
    this._liClosingIds = id
  }

  get liClosingIds() {
    return this._liClosingIds
  }

  reset() {
    this.formElement.reset()
  }

  fillSelectElement(itemsArray) {
    this.ulElement.innerHTML = ""

    let liIdNumber = 0
    let crossIdNumber = 0
    const liIdsArray = []
    const liClosingIdsArray = []
    itemsArray.forEach(item => {
      const liText = document.createElement("span")
      liText.textContent = item
      liText.classList.add("align-self-center", "select__litext")

      const liClosingCross = document.createElement("img")
      liClosingCross.src = "/assets/select/closing-li.svg"
      liClosingCross.alt = "Supprimer le tag"
      liClosingCross.classList.add(
        "opacity-0",
        "h-50",
        "align-self-center",
        "cursor-pointer",
        "pointer-auto"
      )
      liClosingCross.id = `${
        this.selectIdName
      }LiClosingCross_${crossIdNumber++}`
      liClosingIdsArray.push(liClosingCross.id)

      const liItem = document.createElement("li")
      liItem.classList.add(
        "px-2",
        "px-sm-3",
        "d-flex",
        "justify-content-between",
        "select__li"
      )
      liItem.id = `${this.selectIdName}LiItem${liIdNumber++}`
      liItem.dataset.category = `${this.selectIdName}Tags`

      liItem.append(liText, liClosingCross)
      liItem.dataset.liName = liText.textContent.toLowerCase()

      liIdsArray.push(liItem.id)

      this.ulElement.append(liItem)
    })

    this.liIds = liIdsArray
    this.liClosingIds = liClosingIdsArray
  }

  // Opening and closing the select dropdown
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

  // Use in Site.init() when opening the page
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
