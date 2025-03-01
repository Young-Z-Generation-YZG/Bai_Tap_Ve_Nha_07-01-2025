import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import Icons from "@constants/svg-icons";
import { router } from "expo-router";

export type HeaderProps = DrawerHeaderProps & {
  containerStyles?: string;
  handleToggleDrawer?: () => void;
};

const Header = (props: HeaderProps) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      className={`pt-[59px] pb-3 bg-white h-[100px] flex items-center justify-center ${props.containerStyles}`}
    >
      <View className="flex flex-row items-center justify-between w-full px-5">
        <TouchableOpacity onPress={props.handleToggleDrawer}>
          <Icons.MenuIcon />
        </TouchableOpacity>

        <Text className="text-red-500">Chani Logo</Text>

        <View className="flex flex-row gap-4">
          <Icons.SearchIcon />
          <TouchableOpacity
            onPress={() => {
              router.push("cart");
            }}
          >
            <Icons.ShoppingBagIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
