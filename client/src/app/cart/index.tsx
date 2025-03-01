import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import CartItem from "@components/ui/cart-item";
import { router } from "expo-router";

const CartScreen = () => {
  const [items, setItems] = useState([1]);

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="justify-between flex-1 px-3 py-2 ">
        <View>
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <FeatherIcon name="x" size={30} />
          </TouchableOpacity>
          <Text className="mt-5 text-3xl tracking-[5px] uppercase font-TenorSans-Regular">
            Cart
          </Text>
        </View>
        <ScrollView className="w-full mt-5 h-[500px]">
          <View className="flex flex-col gap-6">
            {items.map((item, index) => (
              <CartItem
                key={index}
                title="lamerei"
                price={120}
                imageUrl="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
              />
            ))}
          </View>
        </ScrollView>

        <View>
          {items.length ? (
            <View className="mt-3">
              <View className="w-full h-[1.5px] bg-slate-400/50"></View>
              <View className="flex flex-row justify-center px-10">
                <Text className="w-full mt-5 text-xl uppercase font-TenorSans-Regular">
                  Sub Total
                </Text>

                <Text className="mt-5 text-2xl font-TenorSans-Regular text-secondary">
                  $120
                </Text>
              </View>
              <Text className="mt-2 ml-4 text-base font-TenorSans-Regular text-slate-400">
                *shipping charges, taxes and discount codes  are calculated at
                the time of accounting.
              </Text>
            </View>
          ) : (
            <View></View>
          )}
          <View className="mt-2 bg-black">
            <TouchableOpacity>
              <View className="flex flex-row items-center justify-center py-3">
                <FeatherIcon name="shopping-bag" size={24} color="#ccc" />
                <Text className="ml-2 text-xl text-white uppercase font-TenorSans-Regular">
                  {items.length ? "checkout" : "Continue to shopping"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
