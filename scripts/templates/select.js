export default class Select {
  constructor(selectId) {
    this.selectId = selectId
    this.itemsList = this.selectId.concat("List")
  }

  fillSelectElement(itemsArray) {
    const ulElement = document.getElementById(this.itemsList)

    const liElements = itemsArray
      .map(item => `<li class="select__li">${item}</li>`)
      .join("\n")
    ulElement.insertAdjacentHTML("beforeEnd", liElements)
  }
}
