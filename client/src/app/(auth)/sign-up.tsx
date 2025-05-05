import { ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '@components/layouts/auth.layout';
import { useForm } from 'react-hook-form';
import { InputField } from '~/components/ui/input-field';
import { svgIcons } from '~/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/ui/Button';
import { Link, router } from 'expo-router';
import {
   RegisterFormType,
   RegisterResolver,
} from '~/src/domain/schemas/auth.schema';
import AlertModal from '@components/ui/AlertModal';
import { useRegisterAsyncMutation, useSendmailOtpAsyncQuery } from '~/src/infrastructure/redux/apis/auth.api';

const defaultValues: RegisterFormType = {
   first_name: 'Tran',
   last_name: 'Phuong',
   email: 'tqp30112003@gmail.com',
   password: 'tqp30112003',
   confirm_password: 'tqp30112003',
   // phone_number: '',
};

const SignUpScreen = () => {
   const form = useForm<RegisterFormType>({
      resolver: RegisterResolver,
      defaultValues: defaultValues,
   });

   // const [isAlertModal, setAlertModal] = useState(false)
   // const [messageAlert, setMessageAlert] = useState('')

   const [alertModal, setAlertModal] = useState<{
      message: string;
      isVisible: boolean;
      type: 'SUCCESS' | 'ERROR' | 'WARNING';
   }>({
      message: '',
      isVisible: false,
      type: 'SUCCESS'
   });

   const [
      registerAsync,
      { isLoading: isFetching, error: error, isSuccess, isError, reset },
   ] = useRegisterAsyncMutation();

   // useEffect(() => {
   //    if (error) {
   //       console.log(error);
   //    }
   // }, [error]);

   // useEffect(() => {
   //    if (isSuccess) {
   //       router.navigate('/verify');
   //    }
   // }, [isSuccess]);
   

   const onSubmit = async (data: RegisterFormType) => {

      if (data.password !== data.confirm_password){
         // setMessageAlert("Confirm password not match with password")
         // setAlertModal(true)
         setAlertModal({
            isVisible: true,
            message: "Confirm password not match with password",
            type: 'ERROR'
         })
         return
      }

      const res = await registerAsync({
         first_name: data.first_name,
         last_name: data.last_name,
         email: data.email,
         password: data.password,
         confirm_password: data.confirm_password,
      })
      console.log(res);

      if (res.error) {
         // setMessageAlert("User already registered")
         // setAlertModal(true)
         setAlertModal({
            isVisible: true,
            message: "User already registered",
            type: 'ERROR'
         })
         return
      }

      if (res.data){
         console.log( res.data.params._q , res.data.params._verify_type)

         router.navigate(`verify?_q=${res.data.params._q}&_verify_type=${res.data.params._verify_type}`)
         // const {
         //    data: sendMailOtpRespone
         // } = useSendmailOtpAsyncQuery({
         //    _q: res.data.params._q ,
         //    _verify_type: res.data.params._verify_type
         // })

      }
   };

   return (
      <AuthLayout className="flex-1">
         <View className="h-screen w-full flex justify-start items-center px-7">
            <svgIcons.LogoIcon width={200} height={150} />
            <Text className="w-full text-center text-4xl font-TenorSans-Regular">
               Create New Account
            </Text>
            <Text className="w-full text-center text-base font-Poppins-Light">
               Create your own account for the best user experience with our app
            </Text>
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
                     variant="outline"
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
                     type='password'
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
                     type='password'
                     Icon={() => (
                        <MaterialIcons
                           name="password"
                           size={24}
                           className="opacity-50"
                        />
                     )}
                  />
               </View>

               {/* <View className="">
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
                        return (
                           <MaterialIcons
                              name="phone-android"
                              size={24}
                              className="opacity-50"
                           />
                        );
                     }}
                  />
               </View> */}

               <Button
                  title="SIGN UP"
                  className="bg-black mt-10"
                  textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
                  onPress={form.handleSubmit(onSubmit)}
               />
            </View>
            <View className="w-full flex flex-row justify-center mt-5 ">
               <Text className="text-base font-Poppins-Regular">
                  Already have an account?
               </Text>
               <Link
                  className="text-base font-Poppins-Bold text-blue-600"
                  href={'sign-in'}
               >
                  {' '}
                  Sign In
               </Link>
            </View>
         </View>
         <AlertModal  message={alertModal.message} onClose={() => setAlertModal(prev => ({...prev, isVisible: false}))} type={alertModal.type} isVisible={alertModal.isVisible} />
      </AuthLayout>
   );
};

export default SignUpScreen;
