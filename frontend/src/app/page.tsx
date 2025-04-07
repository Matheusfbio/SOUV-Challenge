"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddItemForm } from "@/components/forms/AddItemForm";
import { useState } from "react";
import { ItemOptions } from "@/components/ItemOptions";

interface Item {
  id: string;
  name: string;
  unit: string;
  category: string;
  quantity: number;
  completed: boolean;
}

const categoryIcons: Record<string, string> = {
  fruta: "🍎",
  padaria: "🥖",
  legume: "🥦",
  bebida: "🥤",
  carne: "🥩",
};

const fetchItems = async (): Promise<Item[]> => {
  const { data } = await axios.get("http://localhost:5000/api/shopping-list");
  return data;
};

export default function Home() {
  const [] = useState({
    name: "",
    unit: "1",
    category: "",
  });

  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery<Item[]>({
    queryKey: ["shoppingList"],
    queryFn: fetchItems,
  });

  const toggleItemCompleted = useMutation({
    mutationFn: async (item: Item) => {
      await axios.put(`http://localhost:5000/api/shopping-list/${item.id}`, {
        ...item,
        completed: !item.completed,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
    },
  });

  return (
    <div className="p-6 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center">🛒 Lista de Compras</h1>

      <div className="text-center mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-500">
              ➕ Adicionar item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border border-white">
            <DialogHeader>
              <DialogTitle className="text-white">Adicionar item</DialogTitle>
              <AddItemForm
                onItemAdded={() =>
                  queryClient.invalidateQueries({ queryKey: ["shoppingList"] })
                }
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 max-w-2xl mx-auto space-y-4">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-lg" />
          ))
        ) : Array.isArray(items) ? (
          items.map((item) => (
            <Card
              key={item.id}
              className={clsx(
                "flex items-center justify-between px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-800 shadow-sm",
                { "opacity-50": item.completed }
              )}
            >
              <CardContent className="flex items-center w-full p-0">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItemCompleted.mutate(item)}
                  className="text-indigo-500 border-indigo-500 mr-4"
                />
                <div className="flex-1">
                  <p
                    className={clsx(
                      "text-base font-medium text-white",
                      item.completed && "line-through text-neutral-500"
                    )}
                  >
                    {item.name}
                  </p>
                  <p
                    className={clsx(
                      "text-sm text-neutral-400",
                      item.completed && "line-through text-neutral-600"
                    )}
                  >
                    {item.quantity} {item.unit}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 px-3 py-1 bg-neutral-900 rounded-full text-sm text-orange-400">
                    <span>{categoryIcons[item.category] || "🛍️"}</span>
                    <span className="capitalize">{item.category}</span>
                  </div>

                  <ItemOptions
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    unit={item.unit}
                    category={item.category}
                    onRefresh={() =>
                      queryClient.invalidateQueries({
                        queryKey: ["shoppingList"],
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-neutral-400">
            Nenhum item encontrado.
          </p>
        )}
      </div>
    </div>
  );
}
