import { View, Text, Pressable } from "react-native";
import { Item } from "../models/Item";
import { Feather, MaterialIcons } from "@expo/vector-icons";

interface Props {
  item: Item;
  onToggle: () => void;
  onDelete: () => void;
}

export default function ItemCard({ item, onToggle, onDelete }: Props) {
  return (
    <View className="bg-gray-900 flex-row justify-between items-center rounded-lg p-3 mb-2">
      <Pressable
        onPress={onToggle}
        className="flex-row items-center space-x-2 flex-1"
      >
        <View
          className={`h-5 w-5 rounded-sm border ${item.completed ? "bg-green-600" : "border-purple-500"}`}
        />
        <View>
          <Text className="text-white font-medium">{item.name}</Text>
          <Text className="text-gray-400 text-sm">
            {item.quantity} {item.unit}
          </Text>
        </View>
      </Pressable>
      <View className="flex-row items-center space-x-3">
        <Feather name="edit" size={20} color="#A78BFA" />
        <MaterialIcons
          name="delete"
          size={20}
          color="#F87171"
          onPress={onDelete}
        />
      </View>
    </View>
  );
}
