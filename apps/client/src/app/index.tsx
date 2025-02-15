import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TestComp from "@components/TestComp";
import "expo-router/entry";

const App = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-blue-700">
        Open up App.js to start working on your app!
        <TestComp />
      </Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
