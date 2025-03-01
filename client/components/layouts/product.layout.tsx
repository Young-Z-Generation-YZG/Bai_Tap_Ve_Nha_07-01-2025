import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function ProductLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`flex-1 bg-white ${className}`}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}
