export default class Tags {
  constructor(tag, tagCategory) {
    this.tag = tag
    this.tagCategory = tagCategory
    this.tagsWrapper = document.getElementById("tagsWrapper")
    this.sibbling = document.getElementById("cardDom")
  }

  // Keep track of created tags
  static flag = 0

  static sibblingOrigin = 130

  // Tags number id
  static id = 0

  // Getters and setters

  set tagId(str) {
    this._tagId = str
  }

  get tagId() {
    return this._tagId
  }

  set closingTagId(str) {
    this._closingTagId = str
  }

  get closingTagId() {
    return this._closingTagId
  }

  removeTag(tag) {
    if (--Tags.flag === 0) {
      this.sibbling.style.top = `${Tags.sibblingOrigin}px`
    } else {
      const minusTranslation = this.sibbling.offsetTop - tag.offsetHeight
      this.sibbling.style.top = `${minusTranslation}px`
    }

    document.getElementById(this.tagId).remove()
  }

  displayTag() {
    const tag = document.createElement("div")
    tag.classList.add("col", "tags")
    tag.id = `tag_${Tags.id}`
    tag.dataset.tagName = this.tag.toLowerCase()
    this.tagId = tag.id

    const innerTag = document.createElement("div")
    innerTag.classList.add("position-relative", "d-flex", "tags__inner")

    const tagText = document.createElement("span")
    tagText.textContent = this.tag
    tagText.classList.add("p-3", "tags__text")
    tagText.dataset.category = this.tagCategory

    const closingTag = document.createElement("img")
    closingTag.src = "/assets/tags/cross.svg"
    closingTag.setAttribute("alt", "Supprimer le tag")
    closingTag.className = "tags__cross"
    closingTag.id = `closingTag_${Tags.id++}`
    this.closingTagId = closingTag.id

    innerTag.append(tagText, closingTag)
    tag.append(innerTag)
    this.tagsWrapper.append(tag)
    Tags.flag++

    const translation =
      this.tagsWrapper.offsetHeight + this.tagsWrapper.offsetTop + 44
    this.sibbling.style.top = `${translation}px`

    closingTag.addEventListener("click", () => {
      this.removeTag(tag)
    })
  }
}
