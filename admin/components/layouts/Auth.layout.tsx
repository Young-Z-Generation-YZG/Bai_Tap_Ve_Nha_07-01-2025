import { View, Text } from "react-native";
import React, { ReactNode } from "react";

const AuthLayout = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View className={`dark:bg-background flex-1 ${className}`}>{children}</View>
  );
};

export default AuthLayout;
