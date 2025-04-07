'use client'

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "~/components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { svgIcons } from "~/constants";
import { InputField } from "~/components/ui/input-field";
import Button from "~/components/ui/Button";
import { Link, router } from "expo-router";
import { LoginFormType, LoginResolver } from "~/src/domain/schemas/auth.schema";
import { useLoginAsyncMutation } from "~/src/infrastructure/redux/apis/auth.api";

const defaultValues: LoginFormType = {
  email: '',
  password: '',
};

const SignInScreen = () => {
  const form = useForm<LoginFormType>({
    resolver: LoginResolver,
    defaultValues: defaultValues,
  });

  const [
    loginAsync,
    { isLoading: isFetching, error: error, isSuccess, isError, reset },
  ] = useLoginAsyncMutation();

  const onSubmit = async (data: LoginFormType) => {
    await loginAsync(data).unwrap();
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      router.replace('/home');
    }
  }, [isSuccess])

  return (
    <AuthLayout className="">
      <SafeAreaView>
        <View className="h-screen w-full flex justify-start items-center px-7">
          <svgIcons.LogoIcon
            width={200}
            height={150}
          />
          <Text className="w-full text-center text-4xl font-TenorSans-Regular mb-5">WELLCOME</Text>
          <Text className="w-full text-center text-base font-Poppins-Light">Log in to your account using email</Text>
          <View className="w-full flex gap-10">
            <View>
              <View className="">
                <InputField<LoginFormType>
                  name="email"
                  form={form}
                  type="text"
                  required
                  placeholder="Email"
                  className="font-TenorSans-Regular"
                  errorStyles="text-sm"
                  Icon={svgIcons.MailIcon}
                />
              </View>

              <View>
                <InputField<LoginFormType>
                  name="password"
                  type="password"
                  form={form}
                  required
                  placeholder="Password"
                  className="font-TenorSans-Regular"
                  errorStyles="text-sm"
                  Icon={svgIcons.PasswordIcon}
                />
              </View>
            </View>
            <View className="w-full flex flex-row justify-end">
              <Link className="text-xl underline font-TenorSans-Regular text-black" href={'forget-password'}>Forgot Password?</Link>
            </View>
            <Button
              title="SIGN IN"
              className="bg-black"
              textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
              onPress={form.handleSubmit(onSubmit)}
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
