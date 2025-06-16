import axios from 'axios'

/**
 * Attempts to log in a user.
 * @param {Object} user - The user credentials.
 * @param {string} baseUrl - The base URL of the API.
 * @returns {Promise<Object>} A promise that resolves to an object containing the response code and data.
 */

const login = async (user) => {
  
  try {

    const url="https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/login";
    const _response = await axios.post(url, user);

    const response = {
      code: _response.status,
      data: _response.data
    }

    return response;

  } catch (exception) {

    let error = exception.response;

    if (error !== undefined) {

      let response = {
        code: error.status,
        message: error.data.error
      }

      return response;
    } else {

      return null;
    }

  }

}

/**
 * Registers a new user.
 * @param {Object|null} newUser - The new user's information.
 * @param {string} baseUrl - The base URL of the API.
 * @returns {Promise<Object|null>} A promise that resolves to an object containing the response code and message, or null if newUser is null.
 */

const register = async (newUser) => {

  if (newUser === null) {
    return null
  }

  try {

     console.log("00000 %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% ", newUser);
    const url="https://vr6mgijfvf.execute-api.eu-north-1.amazonaws.com/user/signup";
    const response = await axios.post(url, newUser); 
    
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(response);

    let _response = {
      code: response.status,
      message: response.data.message
    }

    return _response;

  } catch (exception) {

    let error = exception.response;

    let response = {
      code: error.status,
      message: error.data.message
      //message: error.data.error
    }
    console.log("ERRROR: ",response);
    return response;
  }

}

export default { login, register }