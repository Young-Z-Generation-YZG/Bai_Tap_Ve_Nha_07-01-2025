import { View, Text } from "react-native";
import React from "react";
import Icons from "@constants/svg-icons";

type CommonLayoutProps = {
  children: React.ReactNode;
  className?: string;
  title: string;
};

const CommonLayout = (props: CommonLayoutProps) => {
  return (
    <View className={`flex-1 ${props.className}`}>
      <View className="flex items-center justify-center mt-5">
        <Text className="text-2xl mb-2 tracking-[5px] uppercase font-TenorSans-Regular">
          {props.title}
        </Text>
        <Icons.SeparateLine />
      </View>
      {props.children}
    </View>
  );
};

export default CommonLayout;
