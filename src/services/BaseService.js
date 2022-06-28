import axios from "axios"

export default class Services {
  baseUrl = `${process.env.VUE_APP_API_URL}/`
  module = ""

  constructor(module = "") {
    this.module = module
  }

  get(url = "", params = {}) {
    return axios.get(this.getUrl(url), params)
  }

  post(url = "", data = {}) {
    return axios.post(this.getUrl(url), data)
  }

  put(url = "", data = {}) {
    return axios.put(this.getUrl(url), data)
  }

  delete(url = "", data = {}) {
    return axios.delete(this.getUrl(url), data)
  }

  getUrl(url = "", onlyBase = false) {
    return `${this.baseUrl}${onlyBase ? url : this.checkModule(url)}`
  }

  checkModule(url = "") {
    return (
      (this.module ? (url === "" ? `${this.module}` : `${this.module}/`) : "") +
      url
    )
  }
}
