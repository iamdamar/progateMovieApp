import axios, { AxiosRequestConfig } from "axios";

interface callAPIProps extends AxiosRequestConfig {
  accessToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  accessToken,
}: callAPIProps) {
  let headers = {};
  if (accessToken) {
    headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((error) => error.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null,
    };
    return res;
  }
  const { length } = Object.keys(response.data);
  const res = {
    error: false,
    message: "success",
    data: length > 1 ? response.data : response.data.data,
  };

  return res;
}
