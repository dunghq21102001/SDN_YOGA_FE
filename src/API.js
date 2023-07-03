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


   //class
   static createClass(data) {
      return axios.post(`${this.API_URL_V1}/classes`, data)
   }
   static getListClass() {
      return axios.get(`${this.API_URL_V1}/classes`)
   }
   static getAClass(id) {
      return axios.get(`${this.API_URL_V1}/classes/${id}`)
   }
   static deleteAClass(id) {
      return axios.delete(`${this.API_URL_V1}/classes/${id}`)
   }
   static updateClass(id, data) {
      return axios.put(`${this.API_URL_V1}/classes/updateAClass/${id}`, data)
   }
   static searchClass(name) {
      return axios.get(`${this.API_URL_V1}/classes/search?name=${name}`)
   }
   static sortClass(type) {
      return axios.get(`${this.API_URL_V1}/classes/sort/${type}`)
   }

   //category class
   static getClassCategoriesList() {
      return axios.get(`${this.API_URL_V1}/classCategories`)
   }




   // user, auth
   static login(data) {
      return axios.post(`${this.API_URL_V1}/users/login`, data)
   }

   static register(data) {
      return axios.post(`${this.API_URL_V1}/users/register`, data)
   }

   static updateImageUser(id, imagePath) {
      return axios.put(`${this.API_URL_V1}/users/${id}/image`, imagePath)
   }

   static deleteUser(id) {
      return axios.delete(`${this.API_URL_V1}/users/user/${id}`)
   }

   static getUserList() {
      return axios.get(`${this.API_URL_V1}/users/users`)
   }

   static searchUser(name) {
      return axios.get(`${this.API_URL_V1}/users/search?fullName=${name}`)
   }

   static sortUsersASC() {
      return axios.get(`${this.API_URL_V1}/users/ascending`)
   }

   static sortUsersDESC() {
      return axios.get(`${this.API_URL_V1}/users/descending`)
   }

   static updateUser(id, data) {
      return axios.put(`${this.API_URL_V1}/users/user/${id}`, data)
   }
   static getAUser(id) {
      return axios.get(`${this.API_URL_V1}/users/user/${id}`)
   }

   //contact
   static getListContact() {
      return axios.get(`${this.API_URL_V1}/contacts`)
   }

   static getAContact(id) {
      return axios.get(`${this.API_URL_V1}/contacts/${id}`)
   }

   static createContact(contactData) {
      return axios.post(`${this.API_URL_V1}/contacts`, contactData);
   }

   static updateContact(id, contactData) {
      return axios.put(`${this.API_URL_V1}/contacts/${id}`, contactData);
   }

   static deleteContact(id) {
      return axios.delete(`${this.API_URL_V1}/contacts/${id}`);
   }
}