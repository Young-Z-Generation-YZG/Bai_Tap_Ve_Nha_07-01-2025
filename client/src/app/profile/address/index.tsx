import { ScrollView, Text, View} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import Button from "~/components/ui/Button";
import { Link } from "expo-router";
import { Image } from "react-native";
import { images } from "~/constants";


const AddressScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { 
      // firstName:"Tran",
      // lastName:"Phuong",
      // phoneNumber:'0912345678',
      // addressLine:'01 Vo Van Ngan',
      // district:'phuong abc',
      // province:'Thu Duc',
      // country:'Viet Nam',
      firstName:'',
      lastName:'',
      phoneNumber:'',
      addressLine:'',
      district:'',
      province:'',
      country:'',
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
            {/* <View className="w-full flex justify-center items-center my-7">
              <Image
                source={images.profile}
                className="w-auto h-[150px]"
                resizeMode="contain"
              />
            </View> */}
            <Text className="w-full text-center text-3xl font-TenorSans-Regular mt-10">SHIPPING ADDRESS</Text>
            <View className="w-full flex gap-6 mt-5">
              <View className="flex flex-row gap-5">
                <InputField
                  name="firstName"
                  control={control}
                  placeholder="Fisrt name"
                  placeholderTextColor="#999"
                  containerStyles="flex-1 border-0 border-b-2 border-gray-200 rounded-none"
                  className="text-xl font-TenorSans-Regular"
                  errorStyles="text-sm"
                />
                <InputField
                  name="lastName"
                  control={control}
                  placeholder="Last name"
                  placeholderTextColor="#999"
                  containerStyles="flex-1 border-0 border-b-2 border-gray-200 rounded-none"
                  className="text-xl font-TenorSans-Regular"
                  errorStyles="text-sm"
                />
              </View>
              <InputField
                name="phoneNumber"
                control={control}
                placeholder="Phone number"
                placeholderTextColor="#999"
                containerStyles="border-0 border-b-2 border-gray-200 rounded-none"
                className="text-xl font-TenorSans-Regular"
                errorStyles="text-sm"
              />
              <InputField
                name="addressLine"
                control={control}
                placeholder="Address"
                placeholderTextColor="#999"
                containerStyles="border-0 border-b-2 border-gray-200 rounded-none"
                className="text-xl font-TenorSans-Regular"
                errorStyles="text-sm"
              />
              <InputField
                name="district"
                control={control}
                placeholder="District"
                placeholderTextColor="#999"
                containerStyles="border-0 border-b-2 border-gray-200 rounded-none"
                className="text-xl font-TenorSans-Regular"
                errorStyles="text-sm"
              />
              <InputField
                name="province"
                control={control}
                placeholder="Province"
                placeholderTextColor="#999"
                containerStyles="border-0 border-b-2 border-gray-200 rounded-none"
                className="text-xl font-TenorSans-Regular"
                errorStyles="text-sm"
              />
              <InputField
                name="country"
                control={control}
                placeholder="Country"
                placeholderTextColor="#999"
                containerStyles="border-0 border-b-2 border-gray-200 rounded-none"
                className="text-xl font-TenorSans-Regular"
                errorStyles="text-sm"
              />
            </View>
            <View className="w-full flex gap-6 mt-10">
              <Button
                title="Update Info"
                className="bg-black"
                textStyles="text-white text-center text-xl font-Poppins-SemiBold m-2"
                onPress={handleSubmit(onSubmit)} />
              <Button
                title="Back" 
                className="bg-gray-400"
                textStyles="text-white text-center text-xl font-Poppins-SemiBold m-2"
                onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default AddressScreen;
