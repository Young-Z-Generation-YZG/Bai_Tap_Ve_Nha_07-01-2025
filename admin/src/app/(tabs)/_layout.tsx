import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import TabIcon from "~/components/ui/tab-icon";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#f3f4f680",
          height: 80,
          paddingTop: 10,
          // paddingHorizontal: 5,
          gap: 2,
          flexDirection: "row",
          // alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <FeatherIcon
                  name="home"
                  size={26}
                  color={focused ? "#333" : "#7c828e"}
                />
              }
              focused={focused}
              name="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notify"
        options={{
          title: "Notifications",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <FeatherIcon
                  name="bell"
                  size={26}
                  color={focused ? "#333" : "#7c828e"}
                />
              }
              focused={focused}
              name="Notify"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <FeatherIcon
                  name="settings"
                  size={26}
                  color={focused ? "#333" : "#7c828e"}
                />
              }
              focused={focused}
              name="Settings"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={
                <FeatherIcon
                  name="user"
                  size={26}
                  color={focused ? "#333" : "#7c828e"}
                />
              }
              focused={focused}
              name="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
