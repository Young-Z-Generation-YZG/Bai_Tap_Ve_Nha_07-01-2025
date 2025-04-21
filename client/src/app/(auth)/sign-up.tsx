import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import { svgIcons } from "~/constants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from "~/components/ui/Button";
import { Link } from "expo-router";
import { RegisterFormType, RegisterResolver } from "~/src/domain/schemas/auth.schema";

const defaultValues: RegisterFormType = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  phone_number: '',
};

const SignUpScreen = () => {

  const form = useForm<RegisterFormType>({
    resolver: RegisterResolver,
    defaultValues: defaultValues,
  });

  const onSubmit = (data: RegisterFormType) => {
    console.log(data);
  };

  return (
    <AuthLayout className="">
      <View className="h-screen w-full flex justify-start items-center px-7">
        <svgIcons.LogoIcon
          width={200}
          height={150}
        />
        <Text className="w-full text-center text-4xl font-TenorSans-Regular">Create New Account</Text>
        <Text className="w-full text-center text-base font-Poppins-Light">Create your own account for the best user experience with our app</Text>
        <View className="w-full flex flex-col justify-center">
          <View className="flex flex-row gap-3 w-[170px]">
            <InputField<RegisterFormType>
              name="first_name"
              form={form}
              required
              placeholder="First Name"
              className=""
              errorStyles="text-sm"
            />
            <InputField<RegisterFormType>
              name="last_name"
              form={form}
              required
              placeholder="Last Name"
              className=""
              errorStyles="text-sm"
            />
          </View>

          <View className="">
            <InputField<RegisterFormType>
              name="email"
              form={form}
              required
              placeholder="Email"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={svgIcons.MailIcon}
            />
          </View>
          <View className="">
            <InputField<RegisterFormType>
              name="password"
              form={form}
              required
              placeholder="Password"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={() => (
                <MaterialIcons
                  name="password"
                  size={24}
                  className="opacity-50"
                />
              )}
            />
          </View>

          <View className="">
            <InputField<RegisterFormType>
              name="confirm_password"
              form={form}
              required
              placeholder="Confirm Password"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={() => (
                <MaterialIcons
                  name="password"
                  size={24}
                  className="opacity-50"
                />
              )}
            />


          </View>

          <View className="">
            <InputField<RegisterFormType>
              name="phone_number"
              form={form}
              placeholder="Phone Number"
              className="font-TenorSans-Regular"
              errorStyles="text-sm"
              Icon={() => {
                return <MaterialIcons
                  name="phone-android"
                  size={24}
                  className="opacity-50"
                />
              }}
            />
          </View>

          <Button
            title="SIGN UP"
            className="bg-black mt-10"
            textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
            onPress={form.handleSubmit(onSubmit)}
          />

        </View>
        <View className="w-full flex flex-row justify-center mt-5 ">
          <Text className="text-base font-Poppins-Regular">Already have an account?</Text>
          <Link className="text-base font-Poppins-Bold text-blue-600" href={'sign-in'}> Sign In</Link>
        </View>
      </View>
    </AuthLayout>
  );
};

export default SignUpScreen;
