import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditItemFormProps {
  item: {
    id: string;
    name: string;
    quantity: number;
  };
  onCancel: () => void;
  onSave: () => void;
}

export function EditItemForm({ item, onCancel, onSave }: EditItemFormProps) {
  const [form, setForm] = useState({ ...item });

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/shopping-list/${item.id}`,
        form
      );
      toast.success("Item atualizado com sucesso!");
      onSave();
    } catch (error) {
      toast.error("Erro ao atualizar item.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-zinc-900 p-4 rounded-xl text-white">
      <Input
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Nome do item"
      />
      <Input
        type="number"
        value={form.quantity}
        onChange={(e) => handleChange("quantity", Number(e.target.value))}
        placeholder="Quantidade"
      />
      <div className="flex gap-2 mt-2">
        <Button onClick={handleUpdate}>Salvar</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}
