import { ScrollView, Text, View} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import { svgIcons } from "~/constants"; 
import Button from "~/components/ui/Button";
import { Link } from "expo-router";

const SignUpScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { 
      name: "",
      email:"",
      password:"",
      confirmPassword:"", 
    },
  });
  const onSubmit = (data:any) => console.log(data);
  return (
    <AuthLayout className="">
      <SafeAreaView>
        <View className="h-screen w-full flex justify-start items-center px-7">
          <svgIcons.LogoIcon
            width={200}
            height={150}
          />
          <Text className="w-full text-center text-3xl font-Poppins-SemiBold">Create New Account</Text>
          <Text className="w-full text-center text-base font-Poppins-Light">Create your own account for the best user experience with our app</Text>
          <View className="w-full flex gap-10 mt-10">
            <InputField
              name="name"
              control={control}
              placeholder="Name"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={svgIcons.UserIcon}
            />
            <InputField
              name="email"
              control={control}
              placeholder="Email"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={svgIcons.MailIcon}
            />
            <InputField
              name="password"
              control={control}
              placeholder="Password"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={svgIcons.PasswordIcon}
            />
            <InputField
              name="confirmPassword"
              control={control}
              placeholder="Confirm password"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={svgIcons.PasswordIcon}
            />
            
            <Button
              title="SIGN UP" 
              className="bg-black"
              textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
              onPress={handleSubmit(onSubmit)} 
            />
            
          </View>
          <View className="w-full flex flex-row justify-center mt-5 ">
            <Text className="text-base font-Poppins-Regular">Already have an account?</Text>
            <Link className="text-base font-Poppins-Bold text-blue-600" href={'sign-in'}> Sign In</Link>
          </View>
        </View>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default SignUpScreen;
