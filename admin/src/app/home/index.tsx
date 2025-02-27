import { ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@components/ui/text";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Shirt } from "~/lib/icons/Shirt";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView className="h-full">
        <View className="p-3">
          <Text className="text-4xl font-extrabold text-primary">Home</Text>

          <View className="p-4 rounded-xl bg-[#f3f4f680] mt-2 overflow-hidden">
            <Text className="text-slate-500">Dashboards</Text>
            <View className="flex flex-row py-4">
              <Icon
                name="view-dashboard-edit-outline"
                size={26}
                color="#333"
                className="mr-2"
              />
              <Text className="w-full pb-4 text-lg font-medium text-black border-b border-slate-300">
                Overview
              </Text>
            </View>

            <View className="flex flex-row py-4">
              <Shirt size={26} strokeWidth={2} className="mr-2 text-black" />
              <Text className="w-full pb-4 text-lg font-medium text-black border-b border-slate-300">
                Products
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
