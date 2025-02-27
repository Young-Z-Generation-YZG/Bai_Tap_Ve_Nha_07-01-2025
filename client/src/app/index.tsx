import "expo-router/entry";

import { Link, router } from "expo-router";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "~/components/ui/Button";

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
            <Text className="text-xl font-semibold text-white font-Poppins-SemiBold">
              On boarding Screen
            </Text>
          </View>

          <Button
            title="Login to continue login"
            className="bg-blue-950"
            onPress={() => {
              router.push("/sign-in");
            }}
          />

          <Button
            title="Login to continue register"
            className="mt-5 bg-blue-950"
            onPress={() => {
              router.push("/sign-up");
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
