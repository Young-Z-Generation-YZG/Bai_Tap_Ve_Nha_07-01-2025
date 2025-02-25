import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export type ButtonProps = {
  title: string;
  // styles
  containerStyles?: string;
  textStyles?: string;
  // states
  isLoading?: boolean;
  // actions
  onPress?: () => void;
};

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.isLoading}
      activeOpacity={0.7}
      className={`w-max h-max bg-blue-400 py-2 px-5 rounded-full {${props.containerStyles}}`}
    >
      <Text className={`text-white ${props.textStyles}`}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
