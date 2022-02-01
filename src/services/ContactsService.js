import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  async getContact(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  async newContact(data) {
    return this.httpClient.post('/contacts', data);
  }

  async editContact({ id, ...data }) {
    return this.httpClient.put(`/contacts/${id}`, data);
  }

  async deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`, false);
  }
}

export default new ContactsService();
