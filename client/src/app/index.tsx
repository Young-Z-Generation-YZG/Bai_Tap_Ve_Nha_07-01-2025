import "expo-router/entry";

import { Link, router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "~/components/ui/Button";
import CarouselOnboarding from "@components/ui/carousel-orboarding";
import { images, svgIcons } from "~/constants";
import { useAppSelector } from "../infrastructure/redux/store";
import { useEffect, useState } from "react";
import Swiper from "react-native-swiper";

const App = () => {

  const token = useAppSelector(state => state.auth.accessToken);

  const [index, setIndex] = useState(0);
  
  return (
    <SafeAreaView className="bg-[#111111] h-full">
      <View className="h-full w-full">
        <View className="flex items-center justify-center h-full">
        <Swiper
            style={{}}
            loop={false}
            onIndexChanged={(index) => setIndex(index)}
            index={index}
            activeDotColor="#fff"
          >
            
            <View className="h-full flex justify-start items-center pt-[44px]">
              <Image
                source={images.onboarding01}
                style={{ width: "100%", height: 655, resizeMode: "contain" }} 
              />
            </View>

            <View className="h-full flex justify-start items-center pt-[0px]">
              <svgIcons.OctoberCollectionSvg
                width={200}
                height={150}
              />
              <Image
                source={images.onboarding02}
                style={{ width: "100%", height: 550, resizeMode: "contain" }} 
              />
            </View>

            <View className="h-full flex justify-start items-center pt-[0px] relative">
              <svgIcons.OctoberCollectionSvg
                width={200}
                height={150}
              />
              <Image
                source={images.onboarding03}
                style={{ width: "100%", height: 550, resizeMode: "contain" }} 
              />
              <View className="absolute flex items-center h-[90px] bottom-20 px-10 gap-6">
                <Button
                  title="LOGIN"
                  className="w-[200px] bg-white rounded-md"
                  textStyles="font-TenorSans-Regular text-lg"
                  onPress={() => {
                    router.push("/sign-in");
                  }}
                />
                <Button
                  title="CONTINUE WITHOUT LOGIN"
                  className="w-[260px] p-0 pb-1 bg-transparent rounded-md border-b border-slate-400"
                  textStyles="text-white font-TenorSans-Regular text-lg"
                  onPress={() => router.push("/home")}
                  // onPress={() => router.push('/products')}
                />
              </View>
            </View>

          </Swiper>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 20,
              right: 20,
              height: 70,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                router.push("/home");
              }}
            >
              <Text className="text-sm text-white font-TenorSans-Regular">
                Skip
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                index < 2 ? setIndex(index + 1) : router.push("/home");
              }}
            >
              <Text className="text-sm text-white font-TenorSans-Regular">
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
