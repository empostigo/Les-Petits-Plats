export default class Input {
  constructor(inputId) {
    this.inputElement = document.getElementById(inputId)
    this.inputForm = document.getElementById(inputId.concat("Form"))
    this.inputCross = document.getElementById(inputId.concat("Cross"))
  }

  // Clear input
  reset() {
    this.inputForm.reset()
  }

  // Avoid html injection
  sanitize() {
    return this.inputElement.value.trim().replaceAll(/[</>]/g, "")
  }

  // Render erasing cross in inputs
  static waitForUserEntry(...inputs) {
    inputs.forEach(input => {
      input.inputElement.addEventListener("input", content => {
        content.target.value.length > 0
          ? input.inputCross.classList.remove("opacity-0")
          : input.inputCross.classList.add("opacity-0")
      })

      input.inputCross.addEventListener("click", () => {
        input.reset()
        input.inputCross.classList.add("opacity-0")
      })
    })
  }
}
