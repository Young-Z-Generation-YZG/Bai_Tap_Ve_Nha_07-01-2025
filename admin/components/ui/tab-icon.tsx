import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabIconProps {
  icon: any;
  name?: string;
  color?: string;
  focused?: boolean;
}

const TabIcon = (props: TabIconProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="relative right-5">
      <View
        className={`absolute -top-[14px] flex items-center justify-center gap-2`}
      >
        {props.icon}
        <Text
          className={`text-xs w-full h-6 ${
            props.focused ? "font-bold" : "font-normal"
          }`}
        >
          {props.name}
        </Text>
      </View>
    </View>
  );
};

export default TabIcon;
