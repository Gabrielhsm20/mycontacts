import APIError from '../../errors/APIError';

import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request({
    path, method, headers, body,
  }, readResponseBody = true) {
    await delay(300);

    const response = await fetch(
      this.baseURL + path,
      {
        headers,
        method,
        body: JSON.stringify(body),
      },
    );

    if (!readResponseBody) {
      return response.ok;
    }

    const contentType = response.headers.get('Content-Type');

    const responseBody = contentType.includes('application/json')
      ? await response.json()
      : null;

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }

  async get(path) {
    return this.request({
      path,
      method: 'GET',
    });
  }

  async post(path, data) {
    return this.request({
      path,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
  }

  async put(path, data) {
    return this.request({
      path,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });
  }

  async delete(path, readResponseBody) {
    return this.request({
      path,
      method: 'DELETE',
    }, readResponseBody);
  }
}

export default HttpClient;
