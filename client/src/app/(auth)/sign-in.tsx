import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/components/layouts/auth.layout";

const SignInScreen = () => {
  return (
    <AuthLayout className="">
      <SafeAreaView>
        <Text>Login screen</Text>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default SignInScreen;
