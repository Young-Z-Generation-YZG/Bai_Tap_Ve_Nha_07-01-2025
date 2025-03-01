import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type AppButtonProps = {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  containerStyles?: string;
  textStyles?: string;
};

const AppButton = (props: AppButtonProps) => {
  const isRenderIconRight = props.icon && props.iconPosition === "right";

  if (props.icon && props.iconPosition === "right") {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View
          className={`bg-black flex flex-row items-center justify-center gap-3 ${props.containerStyles}`}
        >
          <Text
            className={`text-white font-TenorSans-Regular uppercase text-2xl py-3 ${props.textStyles}`}
          >
            {props.title}
          </Text>
          {props.icon && props.icon}
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity>
      <View
        className={`bg-black flex flex-row items-center justify-center gap-3 ${props.containerStyles}`}
      >
        {props.icon && props.icon}
        <Text
          className={`text-white font-TenorSans-Regular uppercase text-2xl py-3 ${props.textStyles}`}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
