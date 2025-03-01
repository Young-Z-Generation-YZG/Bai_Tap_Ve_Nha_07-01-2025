import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { svgIcons } from "~/constants"; 
import { InputField } from "~/components/ui/input-field";
import Button from "~/components/ui/Button";
import { Link } from "expo-router";

const SignInScreen = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { 
      email:"",
      password:"",
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
          <Text className="w-full text-center text-3xl font-Poppins-SemiBold">Welcome to our app</Text>
          <Text className="w-full text-center text-base font-Poppins-Light">Log in to your account using email or social networks</Text>
          <View className="w-full flex gap-10 mt-10">
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
            <View className="w-full flex flex-row justify-end">
              <Link className="text-xl font-TenorSans-Regular text-black" href={'forget-password'}>Forgot Password?</Link>
            </View>
            <Button
              title="SIGN IN" 
              className="bg-black"
              textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
              onPress={handleSubmit(onSubmit)} 
            />
          </View>
          <View className="w-full flex flex-row justify-center mt-5 ">
            <Text className="text-base font-Poppins-Regular">Create an account?</Text>
            <Link className="text-base font-Poppins-Bold text-blue-600" href={'sign-up'}> Sign Up</Link>
          </View>
        </View>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default SignInScreen;
