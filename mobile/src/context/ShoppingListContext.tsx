// context/ShoppingListContext.tsx
import { createContext, useContext, useState } from "react";
import { Item } from "../models/Item";
import { v4 as uuidv4 } from "uuid";

type ShoppingListContextType = {
  items: Item[];
  addItem: (item: Omit<Item, "id" | "completed">) => void;
  removeItem: (id: string) => void;
  toggleItem: (id: string) => void;
};

export const ShoppingListContext = createContext<
  ShoppingListContextType | undefined
>(undefined);

export function ShoppingListProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = (item: Omit<Item, "id" | "completed">) => {
    const newItem: Item = {
      ...item,
      id: uuidv4(),
      completed: false,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <ShoppingListContext.Provider
      value={{ items, addItem, removeItem, toggleItem }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingListContext() {
  const context = useContext(ShoppingListContext);
  if (!context)
    throw new Error(
      "useShoppingListContext must be used within a ShoppingListProvider"
    );
  return context;
}
