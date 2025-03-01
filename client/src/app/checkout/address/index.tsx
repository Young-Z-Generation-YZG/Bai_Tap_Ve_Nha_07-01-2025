import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CommonLayout from "@components/layouts/common.layout";
import FeatherIcon from "react-native-vector-icons/Feather";
import AppDropdown from "@components/ui/AppDropdown";

const dropdownItems = [
  {
    id: "1",
    content: <Text style={{ color: "#1f2937" }}>Option 1</Text>,
    onPress: () => console.log("Selected Option 1"),
  },
  {
    id: "2",
    content: <Text style={{ color: "#1f2937" }}>Option 2</Text>,
    onPress: () => console.log("Selected Option 2"),
  },
  {
    id: "3",
    content: <Text style={{ color: "#1f2937" }}>Option 3</Text>,
    onPress: () => console.log("Selected Option 3"),
  },
];

const CheckoutAddressScreen = () => {
  return (
    <CommonLayout title="Checkout Address" className="bg-white">
      <View className="p-5 mt-2">
        <View>
          <Text className="text-xl font-TenorSans-Regular uppercase text-[#888888]">
            Shipping address
          </Text>

          <View className="flex flex-row items-center justify-between p-3">
            <View className="w-[200px]">
              <Text className="text-xl font-TenorSans-Regular">
                Iris Watson
              </Text>
              <Text className="font-TenorSans-Regular text-[#333]/80 text-wrap mt-2 text-base">
                606-3727 Ullamcorper. Street Roseville NH 11523
              </Text>
              <Text className="font-TenorSans-Regular text-[#333]/80 mt-1 text-base">
                (786) 713-8616
              </Text>
            </View>
            <TouchableOpacity>
              <FeatherIcon name="edit" size={26} color="#3338" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-xl font-TenorSans-Regular uppercase text-[#888888]">
            Payment method
          </Text>

          <View style={{ padding: 20 }}>
            <AppDropdown
              items={dropdownItems}
              placeholder="Select payment method"
            />
          </View>
        </View>
      </View>
    </CommonLayout>
  );
};

export default CheckoutAddressScreen;
