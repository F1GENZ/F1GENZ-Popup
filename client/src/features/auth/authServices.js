import axios from 'axios';

const API_URL = "/install/login";

const authorization = async () => {
  const response = await axios.get(API_URL);

  if(response.data){
    return response.data;
  }
}

const authServices = {
  authorization
}

export default authServices