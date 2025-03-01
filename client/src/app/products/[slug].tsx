import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import ProductLayout from "@components/layouts/product.layout";
import { router, useLocalSearchParams } from "expo-router";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icons from "@constants/svg-icons";
import ProductItem from "@components/ui/product-item";

const ProductDetailScreen = () => {
  const { slug } = useLocalSearchParams();

  const [product, setProduct] = useState({
    title: "lamerei",
    description: "reversible angora cardigan",
    price: 120,
    imageUrl:
      "https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp",
  });

  return (
    <ProductLayout>
      <View className="flex items-center w-full mt-5">
        <Image
          style={{ width: 341, height: 460 }}
          source={{
            uri: product.imageUrl,
          }}
        />
        <View className="mt-1">
          <Text>Carousel</Text>
        </View>
      </View>
      <View className="relative p-5">
        <Text className="text-2xl uppercase font-TenorSans-Regular">
          {product.title}
        </Text>
        <Text className="mt-2 text-lg font-TenorSans-Regular">
          {product.description}
        </Text>
        <Text className="mt-2 text-2xl font-TenorSans-Regular text-secondary">
          ${product.price}
        </Text>
      </View>

      <TouchableOpacity className="flex flex-row items-center justify-between bg-black">
        <View className="flex flex-row items-center gap-2">
          <FeatherIcon name="plus" size={20} color="#FFF" className="ml-3" />
          <Text className="py-5 text-lg text-white uppercase justify-self-start font-TenorSans-Regular">
            Add to basket
          </Text>
        </View>
        <FeatherIcon name="heart" size={20} color="#FFF" className="mr-5" />
      </TouchableOpacity>

      <View className="px-5 py-10">
        <View className="mb-10">
          <Text className="text-2xl uppercase font-TenorSans-Regular">
            Materials
          </Text>
          <Text className="mt-4 text-xl font-TenorSans-Regular leading-[1.8] text-[#555555]">
            We work with monitoring programmes to ensure compliance with safety,
            health and quality standards for our products.
          </Text>
        </View>

        <View className="mb-5">
          <Text className="text-2xl uppercase font-TenorSans-Regular">
            Care
          </Text>
          <Text className="mt-4 text-xl leading-[1.8] font-TenorSans-Regular text-[#555555]">
            To keep your jackets and coats clean, you only need to freshen them
            up and go over them with a cloth or a clothes brush. If you need to
            dry clean a garment, look for a dry cleaner that uses technologies
            that are respectful of the environment.
          </Text>
        </View>

        <View className="m-5">
          <View className="flex flex-row items-center mb-3">
            <Icons.NotBleachIcon style={styles.icon} width={30} height={30} />
            <Text className="text-lg font-TenorSans-Regular text-[#555555]">
              Do not use bleach
            </Text>
          </View>
          <View className="flex flex-row items-center mb-3">
            <Icons.NotTumbleDryIcon
              style={styles.icon}
              width={30}
              height={30}
            />
            <Text className="text-lg font-TenorSans-Regular text-[#555555]">
              Do not tumble dry
            </Text>
          </View>
          <View className="flex flex-row items-center mb-3">
            <Icons.notWashIcon style={styles.icon} width={30} height={30} />
            <Text className="text-lg font-TenorSans-Regular text-[#555555]">
              Dry clean with tetrachloroethylene
            </Text>
          </View>
          <View className="flex flex-row items-center mb-3">
            <Icons.IronLowTempIcon style={styles.icon} width={30} height={30} />
            <Text className="text-lg font-TenorSans-Regular text-[#555555]">
              Iron at a maximum of 110ºC/230ºF
            </Text>
          </View>
        </View>

        <View className="flex items-center justify-end mt-10 mb-10">
          <Text className="mb-3 text-2xl text-center uppercase font-TenorSans-Regular">
            You may also like
          </Text>
          <Icons.SeparateLine />
        </View>

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
      </View>
    </ProductLayout>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});
