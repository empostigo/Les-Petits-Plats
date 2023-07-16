export default class Input {
  constructor(inputId) {
    this.inputId = document.getElementById(inputId)
    this.inputCross = document.getElementById(inputId.concat("Cross"))
  }

  static waitForUserEntry(...inputs) {
    inputs.forEach(input => {
      input.inputId.addEventListener("input", content => {
        content.target.value.length > 0
          ? input.inputCross.classList.remove("opacity-0")
          : input.inputCross.classList.add("opacity-0")
      })

      input.inputId.addEventListener("input", content => {
        if (content.target.value.length > 2)
          content.target.dataset.search = "enable"
      })

      input.inputCross.addEventListener("click", () => {
        input.inputId.value = ""
        input.inputCross.classList.add("opacity-0")
      })
    })
  }
}
