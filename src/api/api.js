import axios from "axios";
import { AUTH_TOKEN } from "./token.js";

axios.defaults.baseURL = "https://api.unsplash.com/";

//const AUTH_TOKEN = "Client-ID OIuwcLh3-CWLbm1Kgg0BlTEtyY1uF6sSQmlKhIJStR0";

axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export const getPhotos = async (searchUrl) => {
  try {
    const response = await axios.get(searchUrl);

    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};