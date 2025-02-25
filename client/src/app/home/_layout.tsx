import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Header from "@components/layouts/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          header: (props) => (
            <Header
              {...props}
              handleToggleDrawer={() => {
                props.navigation.toggleDrawer();
              }}
            />
          ),
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({});
