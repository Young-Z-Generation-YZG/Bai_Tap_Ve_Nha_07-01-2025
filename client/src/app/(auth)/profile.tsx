import { ScrollView, Text, View} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import SvgIcons from "~/constants/svg-icons"; 
import Button from "~/components/ui/Button";
import { Link } from "expo-router";
import { Image } from "react-native";
import { images } from "~/constants";


const ProfileScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { 
      otp01: "",
      email:"",
      password:"",
      confirmPassword:"", 
    },
  });
  const onSubmit = (data:any) => console.log(data);
  return (
    <AuthLayout className="">
      <SafeAreaView>
        <ScrollView 
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="h-screen w-full flex justify-start items-center px-7">
            {/* <SvgIcons.LogoIcon
              width={200}
              height={150}
            /> */}
            <View className="w-full flex justify-center items-center my-7">
              <Image
                source={images.profile}
                className="w-auto h-[150px]"
                resizeMode="contain"
              />
            </View>
            <Text className="w-full text-center text-3xl font-Poppins-SemiBold">PROFILE</Text>
            <View className="w-full flex gap-6 mt-5">
              <InputField
                name="name"
                control={control}
                label="Last Name"
                labelStyles="text-xl font-Poppins-SemiBold"
                containerStyles="h-fit w-full"
                className="font-Poppins-SemiBold"
                errorStyles="text-sm"
              />
              <InputField
                name="name"
                control={control}
                label="Fisrt Name"
                labelStyles="text-xl font-Poppins-SemiBold"
                containerStyles="h-fit w-full"
                className="font-Poppins-SemiBold"
                errorStyles="text-sm"
              />
              <InputField
                name="email"
                control={control}
                label="Email"
                labelStyles="text-xl font-Poppins-SemiBold"
                containerStyles="h-fit w-full"
                className="font-Poppins-SemiBold"
                errorStyles="text-sm"
              />
              <InputField
                name="phoneNumber"
                control={control}
                label="Phone number"
                labelStyles="text-xl font-Poppins-SemiBold"
                containerStyles="h-fit w-full"
                className="font-Poppins-SemiBold"
                errorStyles="text-sm"
              />
            </View>
            <View className="w-full flex gap-6 mt-10">
              <Button
                title="Update Profile" 
                className="bg-black"
                textStyles="text-white text-center text-xl font-Poppins-SemiBold m-2"
                onPress={handleSubmit(onSubmit)} />
              <Button
                title="Sign Out" 
                className="bg-black mt-3"
                textStyles="text-white text-center text-xl font-Poppins-SemiBold m-2"
                onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default ProfileScreen;
