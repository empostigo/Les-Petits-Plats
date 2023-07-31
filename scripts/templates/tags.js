export default class Tags {
  constructor(tag) {
    this.tag = tag
    this.tagsWrapper = document.getElementById("tagsWrapper")
    this.sibbling = document.getElementById("cardDom")
  }

  static flag = 0

  static sibblingOrigin = 130

  displayTag() {
    const tag = document.createElement("div")
    tag.classList.add("col", "tags")
    tag.id = this.tag

    const innerTag = document.createElement("div")
    innerTag.classList.add("position-relative", "d-flex", "tags__inner")

    const tagText = document.createElement("span")
    tagText.textContent = this.tag
    tagText.classList.add("p-3", "tags__text")

    const closingTag = document.createElement("img")
    closingTag.src = "/assets/tags/cross.svg"
    closingTag.setAttribute("alt", "Supprimer le tag")
    closingTag.className = "tags__cross"

    innerTag.append(tagText, closingTag)
    tag.append(innerTag)
    this.tagsWrapper.append(tag)
    Tags.flag++

    const translation =
      this.tagsWrapper.offsetHeight + this.tagsWrapper.offsetTop + 44
    this.sibbling.style.top = `${translation}px`

    closingTag.addEventListener("click", () => {
      if (--Tags.flag === 0) {
        this.sibbling.style.top = `${Tags.sibblingOrigin}px`
        console.log(this.sibbling.style.top)
      } else {
        const minusTranslation = this.sibbling.offsetTop - tag.offsetHeight
        this.sibbling.style.top = `${minusTranslation}px`
      }

      document.getElementById(this.tag).remove()
    })
  }
}
