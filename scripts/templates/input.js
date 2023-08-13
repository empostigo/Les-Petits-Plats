export default class Input {
  constructor(inputId) {
    this.inputTag = document.getElementById(inputId)
    this.inputCross = document.getElementById(inputId.concat("Cross"))
    this.inputSearch = document.getElementById(inputId.concat("Search"))
  }

  static waitForUserEntry(...inputs) {
    inputs.forEach(input => {
      input.inputTag.addEventListener("input", content => {
        content.target.value.length > 0
          ? input.inputCross.classList.remove("opacity-0")
          : input.inputCross.classList.add("opacity-0")
      })

      input.inputCross.addEventListener("click", () => {
        input.inputTag.value = ""
        input.inputCross.classList.add("opacity-0")
      })
    })
  }
}
