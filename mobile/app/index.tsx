import { View } from "react-native";

import { ShoppingListProvider } from "@/src/context/ShoppingListContext";
import ShoppingListScreen from "@/src/views/ShoppingListScreen";

export default function TaskScreen() {
  return (
    <View>
      <ShoppingListProvider>
        <ShoppingListScreen />
      </ShoppingListProvider>
    </View>
  );
}
