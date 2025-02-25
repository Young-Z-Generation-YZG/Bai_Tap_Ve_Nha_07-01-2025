import "expo-router/entry";

import Button from "@components/Button";
import { Link, router } from "expo-router";

import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaView className="bg-[#0D0D0D] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex items-center justify-center h-full">
          <View className="mb-32">
            <Text className="text-white text-xl font-semibold font-Poppins-SemiBold">
              On boarding Screen
            </Text>
          </View>

          <Button
            title="Login to continue"
            containerStyles="bg-blue-950"
            onPress={() => {
              router.push("/sign-in");
            }}
          />

          <View className="mt-5">
            <Link href={"/home"} className="text-white border-b border-white">
              Continue without -&gt;
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
