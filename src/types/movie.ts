import { API_ACCESS_TOKEN, API_BASEURL } from "@env";
import callAPI from "../../config/api";
import axios from "axios";

const ROOT_BASEURL = API_BASEURL;
const ROOT_TOKEN = API_ACCESS_TOKEN;

export async function getMovieList(path: string) {
  const url = `${ROOT_BASEURL}/${path}`;
  const data = {};
  return callAPI({
    url,
    method: "GET",
    data,
    accessToken: ROOT_TOKEN,
  });
}

export async function getGenreList() {
  const url = `genre/movie/list`;
  const response = await axios.get(`${ROOT_BASEURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${ROOT_TOKEN}`,
    },
  });
  const axiosResponse = response.data.genres;
  return {
    responseData: axiosResponse,
  };
}

export async function getMovieByGenre(selectedGenre: number) {
  const url = `discover/movie?with_genres=${selectedGenre}`;
  const response = await axios.get(`${ROOT_BASEURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${ROOT_TOKEN}`,
    },
  });
  const axiosResponse = response.data.results;
  return {
    responseData: axiosResponse,
  };
}