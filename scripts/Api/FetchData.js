export default class FetchData {
  constructor(url, data, maxAge = "1800") {
    this.url = url
    this.data = data
    this.maxAge = maxAge // maxAge defines the time for cache browser validity
    this.header = new Headers()
    this.header.append("Cache-Control", this.maxAge)
  }

  getData = () =>
    fetch(this.url, { headers: this.header })
      .then(response => response.json())
      .then(data => data[this.data])
      .catch(err => console.error("Erreur lors de la lecture des données", err))
}
