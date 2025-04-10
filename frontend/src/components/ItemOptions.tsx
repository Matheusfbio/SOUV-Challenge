"use client";

import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

type ItemProps = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  onRefresh: () => void;
};

export function ItemOptions({
  id,
  name,
  quantity,
  unit,
  category,
  onRefresh,
}: ItemProps) {
  const BASE_URL = process.env.RENDER_URL || "http://localhost:5000";

  const [open, setOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name,
    quantity,
    unit,
    category,
  });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://${BASE_URL}/api/shopping-list/${id}`);
      toast.success("Item deletado com sucesso!");
      onRefresh();
      setOpen(false);
    } catch (err) {
      toast.error("Erro ao deletar item.");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://${BASE_URL}/api/shopping-list/${id}`, form);
      toast.success("Item atualizado com sucesso!");
      onRefresh();
      setOpen(false);
    } catch (err) {
      toast.error("Erro ao atualizar item.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FiMoreVertical className="ml-3 text-neutral-400 hover:text-white cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 text-white rounded-xl border border-zinc-700 shadow-lg p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            {isEditing ? "Editar Item" : "Ações do Item"}
          </DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <label>Nome</label>
              <Input
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="bg-zinc-900 text-white"
              />
            </div>

            <div className="flex gap-2">
              <div>
                <label>Quantidade</label>
                <Input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) =>
                    handleChange("quantity", Number(e.target.value))
                  }
                  className="bg-zinc-900 text-white"
                />
              </div>

              <div>
                <label>Unidade</label>
                <Select
                  value={form.unit}
                  onValueChange={(value) => handleChange("unit", value)}
                >
                  <SelectTrigger className="bg-zinc-900 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 text-white">
                    <SelectItem value="UN">UN</SelectItem>
                    <SelectItem value="KG">KG</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label>Categoria</label>
              <Select
                value={form.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="bg-zinc-900 text-white">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 text-white">
                  <SelectItem value="frutas">Frutas</SelectItem>
                  <SelectItem value="vegetais">Vegetais</SelectItem>
                  <SelectItem value="carne">Carne</SelectItem>
                  <SelectItem value="bebida">Bebidas</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <div className="my-4 text-sm text-gray-400">
            O que deseja fazer com{" "}
            <strong className="text-white">{name}</strong>?
          </div>
        )}

        <DialogFooter className="flex flex-col gap-2">
          {isEditing ? (
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={handleUpdate}
                className="w-full bg-violet-600 hover:bg-violet-700"
              >
                Salvar alterações
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="w-full text-gray-400 hover:text-red-500"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-violet-600 hover:bg-violet-700"
              >
                ✏️ Editar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="w-full"
              >
                🗑️ Deletar
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
