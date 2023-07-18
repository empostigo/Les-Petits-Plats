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
        const re = /^([\p{L}]{3,}( ?[\p{L}]'?[\p{L}]*)*)/u
        if (re.test(content.target.value.trim()))
          console.log(content.target.value)
      })

      input.inputCross.addEventListener("click", () => {
        input.inputId.value = ""
        input.inputCross.classList.add("opacity-0")
      })
    })
  }
}
