import { View, ScrollView, TextInput, Pressable, Text } from "react-native";
import Header from "@/components/Header";
import CategorySelector from "@/components/CategorySelector";
import QuantitySelector from "@/components/QuantitySelector";
import ItemCard from "@/components/ItemCard";
import { useState } from "react";
import { useShoppingListContext } from "@/src/context/ShoppingListContext";
import { Plus } from "lucide-react-native";

export default function ShoppingListScreen() {
  const { items, addItem, removeItem, toggleItem } = useShoppingListContext();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("un");
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!name) return;
    addItem({ name, quantity: Number(quantity), unit, category });
    setName("");
    setQuantity("1");
    setUnit("un");
    setCategory("");
  };

  return (
    <ScrollView className="bg-black px-4 py-6 flex-1">
      <Header />

      <View className="mt-6 space-y-4">
        <TextInput
          className="bg-gray-800 rounded-md text-white px-3 py-2"
          placeholder="Item"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <View className="flex-row space-x-4">
          <QuantitySelector
            quantity={quantity}
            unit={unit}
            onQuantityChange={setQuantity}
            onUnitChange={setUnit}
          />
          <CategorySelector value={category} onChange={setCategory} />

          <Pressable
            onPress={handleAdd}
            className="bg-purple-600 p-3 rounded-full items-center justify-center"
          >
            <Plus color="white" size={20} />
          </Pressable>
        </View>
      </View>

      <View className="mt-8">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onToggle={() => toggleItem(item.id)}
            onDelete={() => removeItem(item.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
