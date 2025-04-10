import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ItemList() {
  const queryClient = useQueryClient();

  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shoppingList"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:5000/api/shopping-list"
      );
      return response.data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/shopping-list/${id}`);
      toast.success("Item removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["shoppingList"] });
    } catch (err) {
      toast.error("Erro ao remover item.");
      console.error(err);
    }
  };

  if (isLoading) return <p className="text-white">Carregando...</p>;
  if (error) return <p className="text-red-500">Erro ao carregar a lista.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {items.map(
        (item: {
          id: string;
          name: string;
          quantity: number;
          unit: string;
          category: string;
        }) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-zinc-900 text-white p-3 rounded-lg"
          >
            <span>
              {item.name} - {item.quantity} {item.unit} [{item.category}]
            </span>
            <div className="flex gap-2">
              {/* Botão de editar (ainda vamos implementar) */}
              <Button
                variant="outline"
                className="text-xs px-2 py-1"
                onClick={() =>
                  console.log("Abrir modal ou formulário de edição")
                }
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                className="text-xs px-2 py-1"
                onClick={() => handleDelete(item.id)}
              >
                Remover
              </Button>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
