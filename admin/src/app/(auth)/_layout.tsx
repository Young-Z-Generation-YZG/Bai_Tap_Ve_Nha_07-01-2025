import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: true,
          title: "Login",
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
