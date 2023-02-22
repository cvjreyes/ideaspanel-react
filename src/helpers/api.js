import axios from "axios";
import { URL } from "./config";

export const api = async (action, url, body) => {
  try {
    const res = await axios[action](`${URL}${url}`, body);
    return res.data;
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
};

export const handleFetch = (results) => {
  const response = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].status === "fulfilled" && results[i].value.ok)
      response[i] = results[i].value.body;
  }
  return response;
};
