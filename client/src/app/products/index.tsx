import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ProductLayout from "~/components/layouts/product.layout";
import ProductItem from "@components/ui/product-item";
import { router } from "expo-router";

const ProductScreen = () => {
  return (
    <ProductLayout className="">
      <Text className="mb-10">Product Screen</Text>
      <View className="flex flex-row flex-wrap items-center justify-center gap-6">
        {[1, 2, 3, 4].map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                router.push("/products/lamerei");
              }}
            >
              <ProductItem
                title="lamerei"
                description="reversible angora cardigan"
                price={120}
                imageUrl="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ProductLayout>
  );
};

export default ProductScreen;
