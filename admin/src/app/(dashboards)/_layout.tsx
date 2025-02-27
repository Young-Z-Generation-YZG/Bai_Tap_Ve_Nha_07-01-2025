import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import IonIcon from "react-native-vector-icons/Ionicons";

const DashboardLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f9f9fa",
        },
        contentStyle: {
          //   borderBlockStartColor: "#333",
          //   outlineColor: "#fff",
          //   borderColor: "#fff",
          //   borderEndColor: "#fff",
          //   borderStartColor: "#fff",
          //   borderTopColor: "#fff",
          //   borderBlockColor: "#fff",
          //   borderBottomColor: "#fff",
          //   borderBlockEndColor: "#fff",
          //   //   borderWidth: 1,
          //   shadowColor: "#fff",
          //   backgroundColor: "#ccc",
        },
        headerShadowVisible: false,
        headerLeft: ({ canGoBack }) => (
          <TouchableOpacity
            className="flex flex-row items-center gap-2"
            onPress={() => {
              // Navigate to Home
              if (canGoBack) {
                router.back();
              }
            }}
          >
            <IonIcon name="chevron-back" size={24} color="#60a5fa" />
            <Text className="text-lg font-semibold text-blue-400">Home</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="overview" />
      <Stack.Screen name="products" />
    </Stack>
  );
};

export default DashboardLayout;
