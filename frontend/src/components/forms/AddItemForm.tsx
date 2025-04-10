import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "axios";

interface AddItemFormProps {
  onItemAdded: () => void;
}

export function AddItemForm({ onItemAdded }: AddItemFormProps) {
  const BASE_URL = process.env.RENDER_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    unit: "UN",
    category: "",
  });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.category) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post(`http://${BASE_URL}/api/shopping-list`, form);

      toast.success("Item adicionado com sucesso!");
      setForm({ name: "", quantity: 1, unit: "UN", category: "" });

      onItemAdded();
    } catch (error) {
      toast.error("Erro ao adicionar item.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-4 bg-black p-4 rounded-xl"
    >
      <div className="flex-1 min-w-[150px]">
        <label className="block text-sm text-gray-300 mb-1">Item</label>
        <Input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Digite o item"
          className="bg-zinc-900 text-white"
        />
      </div>

      <div className="flex gap-2 items-end">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Quantidade</label>
          <Input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            className="w-20 bg-zinc-900 text-white"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1 invisible">
            Unidade
          </label>
          <Select
            value={form.unit}
            onValueChange={(value) => handleChange("unit", value)}
          >
            <SelectTrigger className="w-20 bg-zinc-900 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-white">
              <SelectItem value="UN">UN.</SelectItem>
              <SelectItem value="KG">KG</SelectItem>
              <SelectItem value="L">L</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Categoria</label>
        <Select
          value={form.category}
          onValueChange={(value) => handleChange("category", value)}
        >
          <SelectTrigger className="w-40 bg-zinc-900 text-white">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 text-white">
            <SelectItem value="frutas">Frutas</SelectItem>
            <SelectItem value="padaria">Padaria</SelectItem>
            <SelectItem value="vegetais">Vegetais</SelectItem>
            <SelectItem value="carne">Carne</SelectItem>
            <SelectItem value="bebida">Bebidas</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-0 bg-violet-600 hover:bg-violet-700"
        >
          +
        </Button>
      </div>
    </form>
  );
}
