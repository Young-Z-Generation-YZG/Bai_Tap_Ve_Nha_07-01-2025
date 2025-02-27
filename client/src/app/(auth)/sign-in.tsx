import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import SvgIcons from "~/constants/svg-icons";
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
          <SvgIcons.LogoIcon
            width={200}
            height={150}
          />
          <Text className="w-full text-center text-3xl font-Poppins-SemiBold">Welcome to our app</Text>
          <Text className="w-full text-center text-base font-Poppins-Light">Log in to your account using email or social networks</Text>
          <View className="w-full flex gap-6 mt-5">
            <InputField
              name="email"
              control={control}
              placeholder="Email"
              containerStyles="h-16 w-full"
              className="font-Poppins-SemiBold"
              errorStyles="text-sm"
              Icon={SvgIcons.MailIcon}
            />
            <InputField
              name="password"
              control={control}
              placeholder="Password"
              containerStyles="h-16 w-full"
              className="font-Poppins-SemiBold"
              errorStyles="text-sm"
              Icon={SvgIcons.PasswordIcon}
            />
            <View className="w-full flex flex-row justify-end">
              <Link className="text-base font-Poppins-Bold text-black" href={'forget-password'}> Forgot Password?</Link>
            </View>
            <Button
            title="SIGN IN" 
            className="bg-black"
            textStyles="text-white text-center text-xl font-Poppins-SemiBold m-2"
            onPress={handleSubmit(onSubmit)} />
          </View>
          <Text className="mt-5 text-base font-Poppins-Regular">Or login with</Text>
          <View className="w-full flex gap-2 mt-5">
            <Button
              title="Login with Google" 
              className="bg-gray-200"
              textStyles="text-black text-center text-xl font-Poppins-Medium m-2"
              onPress={handleSubmit(onSubmit)} 
              icon={SvgIcons.GmailIcon}
            />
            <Button
              title="Login with Facebook"
              className="bg-gray-200"
              textStyles="text-black text-center text-xl font-Poppins-Medium m-2"
              onPress={handleSubmit(onSubmit)} 
              icon={SvgIcons.FacebookIcon}
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
