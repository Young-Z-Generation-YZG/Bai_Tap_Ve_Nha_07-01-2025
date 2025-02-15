import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import "../../global.css";

const RootLayout = () => {
  return (
    <>
      <Text>Header</Text>
      <Slot />
      <Text className="text-red-600">Footer</Text>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
