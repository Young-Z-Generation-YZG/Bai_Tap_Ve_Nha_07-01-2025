import "expo-router/entry";

import { Link, router } from "expo-router";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "~/components/ui/Button";
import CarouselOnboarding from "@components/ui/carousel-orboarding";
import { images, svgIcons } from "~/constants";

const App = () => {

  const onboardingItems = [
    {
      id:"1",
      content: (
        <View className="h-full flex justify-end items-center pb-[100px]">
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
        <View className="h-full flex justify-end items-center pb-[100px]">
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
        <View className="h-full flex justify-end items-center pb-[100px]">
          <svgIcons.OctoberCollectionSvg
            width={200}
            height={150}
          />
          <Image
            source={images.onboarding03}
            style={{ width: "100%", height: 550, resizeMode: "contain" }} 
          />
        </View>
      ),
    },
    {
      id: "4",
      content: 
        <View className="h-full flex justify-center items-center gap-5 pb-[100px]">
          {/* <View className="mb-32">
            <Text className="text-xl font-semibold text-white font-Poppins-SemiBold">
              On boarding Screen
            </Text>
          </View> */}
          <svgIcons.LogoIcon
            width={300}
            height={200}
          />
          <Button
            title="LOGIN TO APP"
            className="bg-white w-[300px] py-5 rounded-md"
            textStyles="font-TenorSans-Regular text-lg"
            onPress={() => {
              router.push("/sign-in");
            }}
          />

          <Button
            title="CONTINUE WITHOUT LOGIN"
            className="bg-gray-400 w-[300px] py-5 rounded-md"
            textStyles="font-TenorSans-Regular text-lg"
            onPress={() => {
              router.push("/home");
            }}
          />
        </View>,
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
