import { View, Text, TextInput } from "react-native";

interface Props {
  quantity: string;
  unit: string;
  onQuantityChange: (value: string) => void;
  onUnitChange: (value: string) => void;
}

export default function QuantitySelector({
  quantity,
  unit,
  onQuantityChange,
  onUnitChange,
}: Props) {
  return (
    <View className="flex-row space-x-2 flex-1">
      <View className="flex-1">
        <Text className="text-white mb-1">Quantidade</Text>
        <TextInput
          className="bg-gray-800 rounded-md text-white px-2 py-1"
          value={quantity}
          onChangeText={onQuantityChange}
          keyboardType="numeric"
        />
      </View>
      <View className="flex-1">
        <Text className="text-white mb-1">Un.</Text>
        <TextInput
          className="bg-gray-800 rounded-md text-white px-2 py-1"
          value={unit}
          onChangeText={onUnitChange}
        />
      </View>
    </View>
  );
}
