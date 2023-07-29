export default class Tags {
  constructor(tag) {
    this.tag = tag
    this.tagsWrapper = document.getElementById("tagsWrapper")
    this.sibbling = document.getElementById("cardDom")
  }

  displayTag() {
    const tag = document.createElement("div")
    tag.classList.add(
      "d-flex",
      "align-center",
      "gap-5",
      "positon-relative",
      "tags"
    )

    const tagText = document.createElement("span")
    tagText.textContent = this.tag
    tagText.classList.add("tags__text")

    const closingTag = document.createElement("img")
    closingTag.src = "/assets/tags/cross.svg"
    closingTag.setAttribute("alt", "Supprimer le tag")
    closingTag.className = "tags__cross"

    tag.append(tagText, closingTag)
    this.tagsWrapper.append(tag)

    const translation = this.sibbling.offsetTop + 54
    this.sibbling.style.top = `${translation}px`
  }
}
