import { Plus } from "lucide-react-native";
import { useContext, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Text,
  StatusBar,
} from "react-native";

import CategorySelector from "@/components/CategorySelector";
import Header from "@/components/Header";
import ItemCard from "@/components/ItemCard";
import QuantitySelector from "@/components/QuantitySelector";
import { ShoppingListContext } from "@/src/context/ShoppingListContext";

export default function ShoppingListScreen() {
  const shoppingListContext = useContext(ShoppingListContext);

  if (!shoppingListContext) {
    throw new Error("ShoppingListContext is not provided");
  }

  const { items, addItem, removeItem, toggleItem } = shoppingListContext;

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("un");
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    addItem({ name, quantity: Number(quantity), unit, category });
    setName("");
    setQuantity("1");
    setUnit("un");
    setCategory("");
  };

  return (
    <ScrollView
      className="flex-1 bg-black px-4 py-6"
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />
      <Header />

      {/* Input de nome do item */}
      <View className="mt-6 space-y-4">
        <View>
          <Text className="text-white text-base mb-1">Item</Text>
          <TextInput
            className="rounded-md bg-zinc-900 px-3 py-2 text-white border border-zinc-700"
            placeholder="Item"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Linha com quantidade, categoria e botão de adicionar */}
        <View className="flex-row items-end space-x-3">
          <View className="flex-1">
            <Text className="text-white text-base mb-1">Quantidade</Text>
            <QuantitySelector
              quantity={quantity}
              unit={unit}
              onQuantityChange={setQuantity}
              onUnitChange={setUnit}
            />
          </View>

          <View className="flex-1">
            <Text className="text-white text-base mb-1">Categoria</Text>
            <CategorySelector value={category} onChange={setCategory} />
          </View>

          <Pressable
            onPress={handleAdd}
            className="mb-1 h-12 w-12 items-center justify-center rounded-full bg-purple-600 active:opacity-80"
          >
            <Plus color="black" size={44} />
          </Pressable>
        </View>
      </View>

      {/* Lista de itens */}
      <View className="mt-8 space-y-3 pb-8">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onToggle={() => item.id && toggleItem(item.id)}
            onDelete={() => item.id && removeItem(item.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
