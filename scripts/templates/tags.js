// Tags appear when you select an ingredient/device/utensil in the selects

export default class Tags {
  constructor(tag, tagCategory) {
    this.tag = tag
    this.tagCategory = tagCategory
    this.tagsWrapper = document.getElementById("tagsWrapper")
    this.sibbling = document.getElementById("cardDom")
  }

  // Keep track of created tags
  static flag = 0

  // The cards container has css rule position: absolute
  // So we need to place it manually, when adding and removing tags
  static sibblingOrigin = 130

  // Tags number id
  static id = 0

  // Getters and setters

  // Keep track of tag position
  set tagOffsetHeight(height) {
    this._tagOffsetHeight = height
  }

  get tagOffsetHeight() {
    return this._tagOffsetHeight
  }

  // tag id
  set tagId(str) {
    this._tagId = str
  }

  get tagId() {
    return this._tagId
  }

  // tag's removing cross
  set closingTagId(str) {
    this._closingTagId = str
  }

  get closingTagId() {
    return this._closingTagId
  }

  removeTag() {
    if (--Tags.flag === 0) {
      this.sibbling.style.top = `${Tags.sibblingOrigin}px`
    } else {
      const minusTranslation = this.sibbling.offsetTop - this.tagOffsetHeight
      this.sibbling.style.top = `${minusTranslation}px`
    }

    document.getElementById(this.tagId).remove()
  }

  displayTag() {
    // Tag strutcture:
    // <div.tags>
    //  <div.tags__inner>
    //    <span.tags__text>
    //    <img.tags__cross>
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
    this.tagOffsetHeight = tag.offsetHeight
    Tags.flag++

    // Calculate cards container Y translation
    const translation =
      this.tagsWrapper.offsetHeight + this.tagsWrapper.offsetTop + 44
    this.sibbling.style.top = `${translation}px`

    closingTag.addEventListener("click", () => {
      this.removeTag()
    })
  }
}
