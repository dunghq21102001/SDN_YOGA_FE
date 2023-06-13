import axios from "axios"

export default class API {
   static API_URL_V1 = 'http://localhost:3001/api/v1'

   // product
   static getProducts() {
      return axios.get(`${this.API_URL_V1}/products`)
   }

   static getAProduct(id) {
      return axios.get(`${this.API_URL_V1}/products/${id}`)
   }



   // user, auth
   static login(data) {
      return axios.post(`${this.API_URL_V1}/users/login`, data)
   }

   static register(data) {
      return axios.post(`${this.API_URL_V1}/users/register`, data)
   }
}