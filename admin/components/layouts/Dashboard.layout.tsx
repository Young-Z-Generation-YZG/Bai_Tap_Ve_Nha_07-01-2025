import { View, Text, ScrollView } from "react-native";
import React from "react";

const DashboardLayout = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={`dark:bg-background flex-1 bg-[#f9f9fa] p-2 ${className}`}>
      <ScrollView className="h-full">{children}</ScrollView>
    </View>
  );
};

export default DashboardLayout;
