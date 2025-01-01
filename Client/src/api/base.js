import axios from 'axios';
const baseApiUrl = import.meta.env.VITE_API_URL; // Replace with your API base URL
const testApiUrl = import.meta.env.VITE_TEST_API_URL;

// Using Fetch API
export async function apiFetch(
  endpoint,
  { method = 'GET', headers = {}, body = null, signal, otherOptions } = {},
) {
  const url = `${testApiUrl}${endpoint}`; //concatanate the base url with the endpoint for Full URL

  const options = {
    method, //Define the reques t method
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }, //Define the headers
    body: body ? JSON.stringify(body) : null, //unlike axios, fetch API requires the body to be stringified
    signal, // Include signal for request cancellation, AbortController( React Router dom library automatically passes request cancellation signal)
    otherOptions, //Include other options
  };

  try {
    const response = await fetch(url, options); // Use fetch API to make the request

    if (!response.ok) {
      // Unline axios, fetch API does not throw an error for non 200 status code, So we have to check the status code manually
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); //Convert the response to JSON
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Fetch request was canceled');
    } else {
      console.error('Fetch error:', error);
    }
    throw error; // Re-throw error for further handling
  }
}

// Using Axios
export const apiAxios = axios.create({ baseURL: testApiUrl }); //create Axios instance with the base URL, can use timeout, headers, etc
