// api.js
const API_PREFIX = 'http://localhost:3000/api';

const sendRequest = (url, options) => {
  const fullUrl = `${API_PREFIX}${url}`;
  return fetch(fullUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Request error:', error);
      throw error;
    });
};

const getRequest = (url, params) => {
  const queryString = Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');

  const fullUrl = url + (queryString ? `?${queryString}` : '');

  return sendRequest(fullUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const postRequest = (url, data) => {
  return sendRequest(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
};

export { getRequest, postRequest };
