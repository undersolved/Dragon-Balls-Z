import axios from "axios";
import { ApiResponse, Character } from "../types/character";

const api = axios.create({
  baseURL: "https://dragonball-api.com/api",
});

export const getCharacters = async (url?: string): Promise<ApiResponse> => {
  const res = await api.get(url || "/characters");
  return res.data;
};

export const searchCharacters = async (query: string): Promise<Character[]> => {
  const res = await api.get(`/characters?name=${query}`);
  return res.data;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const res = await api.get(`/characters/${id}`);
  return res.data;
};
