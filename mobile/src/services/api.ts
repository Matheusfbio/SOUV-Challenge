import axios from "axios";

import { Item } from "../models/Item";

const api = axios.create({
  baseURL: "http://localhost:5000/api/shopping-list",
});

export const fetchItems = async (): Promise<Item[]> => {
  const res = await api.get<Item[]>("/");
  return res.data;
};

export const createItem = async (
  item: Omit<Item, "id" | "completed">
): Promise<Item> => {
  const res = await api.post<Item>("/", item);
  return res.data;
};

export const updateItem = async (item: Item): Promise<void> => {
  await api.put(`/${item.id}`, item);
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
