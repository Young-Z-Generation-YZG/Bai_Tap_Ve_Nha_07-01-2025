import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@components/layouts/auth.layout";

const SignUpScreen = () => {
  return (
    <AuthLayout className="">
      <SafeAreaView>
        <ScrollView>
          <View className="h-screen bg-red-400">
            <Text>Register screen</Text>
            <Text className="text-lg font-TenorSans-Regular">NEW ARRIVAL</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default SignUpScreen;
