// src/models/Item.ts

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  completed: boolean;
}

// Adicione isso abaixo, se ainda não estiver:
export const categories = [
  "Hortifruti",
  "Carnes",
  "Laticínios",
  "Bebidas",
  "Limpeza",
  "Padaria",
  "Outros",
];
