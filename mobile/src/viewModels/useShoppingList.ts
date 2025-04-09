import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
} from "../services/api";
import { Item } from "../models/Item";

export const useShoppingList = () => {
  const queryClient = useQueryClient();

  const { data: items, ...restQuery } = useQuery({
    queryKey: ["shopping-list"],
    queryFn: fetchItems,
  });

  const create = useMutation({
    mutationFn: createItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });

  const update = useMutation({
    mutationFn: updateItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });

  const remove = useMutation({
    mutationFn: deleteItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });

  return {
    items,
    createItem: create.mutate,
    updateItem: update.mutate,
    deleteItem: remove.mutate,
    ...restQuery,
  };
};
