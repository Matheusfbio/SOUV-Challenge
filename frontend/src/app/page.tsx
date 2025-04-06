"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { FiMoreVertical } from "react-icons/fi";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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

interface Item {
  id: string;
  name: string;
  unit: string;
  category: string;
  completed: boolean;
}

const categoryIcons: Record<string, string> = {
  fruta: "🍎",
  padaria: "🥖",
  legume: "🥦",
  bebida: "🥤",
  carne: "🥩",
};

// Busca os itens da API
const fetchItems = async (): Promise<Item[]> => {
  const { data } = await axios.get("http://localhost:5000/api/shopping-list");
  return data;
};

export default function Home() {
  // const [] = useState({
  //   name: "",
  //   unit: "",
  //   category: "",
  // });

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
          <DialogContent className="bg-neutral-950 border border-neutral-800">
            <DialogHeader>
              <DialogTitle>Adicionar item</DialogTitle>
              <AddItemForm
                onItemAdded={() =>
                  queryClient.invalidateQueries({ queryKey: ["shoppingList"] })
                }
              />
            </DialogHeader>
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                addItem.mutate();
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 space-y-1">
                  <Label>Unidade</Label>
                  <Input
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Categoria</Label>
                <Input
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full bg-green-600">
                Salvar
              </Button>
            </form> */}
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
                "flex items-center p-4 rounded-lg border shadow-lg transition-all bg-neutral-800 hover:bg-neutral-700 cursor-pointer",
                { "opacity-50": item.completed }
              )}
            >
              <CardContent className="flex items-center w-full space-x-4">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItemCompleted.mutate(item)}
                />
                <div className="flex-1">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <p className="text-sm text-neutral-400">{item.unit}</p>
                </div>
                <Badge variant="secondary">
                  {categoryIcons[item.category] || "🛍️"} {item.category}
                </Badge>
                <FiMoreVertical className="ml-3 text-neutral-400 hover:text-white cursor-pointer" />
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
