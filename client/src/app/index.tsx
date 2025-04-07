import "expo-router/entry";

import { Link, router } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "~/components/ui/Button";
import CarouselOnboarding from "@components/ui/carousel-orboarding";
import { images, svgIcons } from "~/constants";
import { useAppSelector } from "../infrastructure/redux/store";
import { useEffect } from "react";

const App = () => {

  const token = useAppSelector(state => state.auth.accessToken);

  // useEffect(() => {
  //   if (token) {
  //     setTimeout(() => {
  //       router.replace('/home');
  //     }, 500);
  //   }
  // }, [token])

  const onboardingItems = [
    {
      id: "1",
      content: (
        <View className="h-full flex justify-end items-center pb-[120px]">
          <Image
            source={images.onboarding01}
            style={{ width: "100%", height: 655, resizeMode: "contain" }}
          />
        </View>
      ),
    },
    {
      id: "2",
      content: (
        <View className="h-full flex justify-end items-center pb-[120px]">
          <svgIcons.OctoberCollectionSvg
            width={200}
            height={150}
          />
          <Image
            source={images.onboarding02}
            style={{ width: "100%", height: 550, resizeMode: "contain" }}
          />
        </View>
      ),
    },
    {
      id: "3",
      content: (
        <View className="h-full flex justify-end items-center pb-[120px] relative">
          <svgIcons.OctoberCollectionSvg
            width={200}
            height={150}
          />
          <Image
            source={images.onboarding03}
            style={{ width: "100%", height: 550, resizeMode: "contain" }}
          />

          <View className="absolute flex items-center h-[90px] bottom-6 px-10 gap-7">
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
              onPress={() => {
                router.push("/home");
              }}
            />
          </View>
        </View>
      ),
    },
  ];
  // 0D0D0D
  //
  return (
    <SafeAreaView className="bg-[#111111] h-full">
      <View className="h-full w-full">
        <View className="flex items-center justify-center h-full">
          <CarouselOnboarding
            items={onboardingItems.map((item) => {
              return (item.content);
            })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
