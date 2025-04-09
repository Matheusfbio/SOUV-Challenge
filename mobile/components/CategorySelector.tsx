import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";
import { categories } from "@/src/models/Item";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelector({ value, onChange }: Props) {
  return (
    <View className="flex-1">
      <Text className="text-white mb-1">Categoria</Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        dropdownIconColor="#fff"
        style={{ color: "#fff", backgroundColor: "#1F2937", borderRadius: 8 }}
      >
        <Picker.Item label="Selecione" value="" />
        {categories.map((cat) => (
          <Picker.Item label={cat} value={cat} key={cat} />
        ))}
      </Picker>
    </View>
  );
}
