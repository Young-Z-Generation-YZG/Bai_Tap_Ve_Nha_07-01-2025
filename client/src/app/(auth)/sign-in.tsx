'use client';

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '~/components/layouts/auth.layout';
import { useForm } from 'react-hook-form';
import { svgIcons } from '~/constants';
import { InputField } from '~/components/ui/input-field';
import Button from '~/components/ui/Button';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { LoginFormType, LoginResolver } from '~/src/domain/schemas/auth.schema';
import { useLoginAsyncMutation } from '~/src/infrastructure/redux/apis/auth.api';
import SocketService from '~/src/infrastructure/socket';
import AlertModal, { AlertModalProps } from '@components/ui/AlertModal';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import { useDispatch } from 'react-redux';
import { addNotification, clearNotifications } from '~/src/infrastructure/redux/features/app/notification.slice';
import { InvoiceNotificationType, ReviewNotificationType } from '~/src/infrastructure/types/notification.type';
import { useGetNotificationsAsyncQuery } from '~/src/infrastructure/redux/apis/notification.api';

const defaultValues: LoginFormType = {
   email: 'foo@gmail.com',
   password: 'user',
};

const SignInScreen = () => {

   const { prevScreen } = useLocalSearchParams()

   console.log('[SignInScreen]::prevScreen::',prevScreen,)
   const dispatch = useDispatch();
   const { userId } = useAppSelector((state) => state.auth)
   const form = useForm<LoginFormType>({
      resolver: LoginResolver,
      defaultValues: defaultValues,
   });
   const [alertModal, setAlertModal] = useState<AlertModalProps>({
      message: '',
      isVisible: false,
      type: 'SUCCESS',
      onClose: () => {},
      onSubmit: () => {},
      visibleClose: true,
      visibleSubmit: true,
   });
   const [
      loginAsync,
      { isLoading: isFetching, error: error, isSuccess, isError, reset },
   ] = useLoginAsyncMutation();


   useEffect(() => {
      if (error) {
         setAlertModal({
            message: 'You not have account. Please register account',
            isVisible: true,
            type: 'ERROR',
            onClose: () => setAlertModal(prev => ({...prev, isVisible: false})),
            onSubmit: () => {},
            visibleClose: false,
            visibleSubmit: false,
         })
      }
   }, [error]);

   useEffect(() => {
      if (userId) {
         if (!SocketService.isConnected()) {
            SocketService.connect();
         }
         SocketService.authenticate(userId);
         if (SocketService.socket) {
            SocketService.socket.off('user-notification');

            SocketService.socket.on('user-notification', (notification) => {
               console.log('Received notification:', notification);
               if (notification.type === 'INVOICE') {
                  const data: InvoiceNotificationType = {
                     id: notification._id,
                     recipient: notification.recipient,
                     sender: notification.sender,
                     type: notification.type,
                     isRead: notification.isRead,
                     readAt: notification.readAt,
                     isDeleted: notification.isDeleted,
                     createdAt: notification.createdAt,
                     invoice_info: {
                        label: notification.invoice_info.label,
                        message: notification.invoice_info.message,
                        invoice_id: notification.invoice_info.invoice_id,
                        invoice_code: notification.invoice_info.invoice_code,
                        customer_id: notification.invoice_info.customer_id,
                        customer_name: notification.invoice_info.customer_name,
                        amount: notification.invoice_info.amount,
                        unit: notification.invoice_info.unit,
                        status: notification.invoice_info.status,
                     }
                  };
                  dispatch(addNotification(data));
               }
               if (notification.type === 'REVIEW') {
                  const data: ReviewNotificationType = {
                     id: notification._id,
                     recipient: notification.recipient,
                     sender: notification.sender,
                     type: notification.type,
                     isRead: notification.isRead,
                     readAt: notification.readAt,
                     isDeleted: notification.isDeleted,
                     createdAt: notification.createdAt,
                     review_info: {
                        label: notification.review_info.label,
                        message: notification.review_info.message,
                        content: notification.review_info.content,
                        customer_name: notification.review_info.customer_name,
                        invoice_code: notification.review_info.invoice_code,
                        product_id: notification.review_info.product_id,
                        product_image: notification.review_info.product_image,
                        product_name: notification.review_info.product_name,
                        rating: notification.review_info.rating,
                        review_id: notification.review_info.review_id,
                        user_id: notification.review_info.user_id,
                     }
                  };
                  dispatch(addNotification(data));
               }
            });
         }
      }
   }, [userId]);



   const onSubmit = async (data: LoginFormType) => {
      const res = await loginAsync(data).unwrap();
      if (res.data.verify_type === 'EMAIL_VERIFICATION'){
      setAlertModal({
         message: 'You not verify email yet. Verify for your shopping.',
         isVisible: true,
         type: 'WARNING',
         onClose: () => setAlertModal(prev => ({...prev, isVisible: false})),
         onSubmit: () => router.navigate(`verify?_q=${res.data.params._q}&_verify_type=${res.data.params._verify_type}`),
         visibleClose: true,
         visibleSubmit: true,
      })
      }
      if (res.data.verify_type === 'CREDENTIALS_VERIFICATION'){      
         router.replace('/home');
      }
   };
   // const onSubmit = async (data: LoginFormType) => {
   //    const res = await loginAsync(data).unwrap();
   //    if (res.data.verify_type === 'EMAIL_VERIFICATION'){
   //       setAlertModal({
   //          message: 'You not verify email yet. Verify for your shopping.',
   //          isVisible: true,
   //          type: 'WARNING',
   //          onClose: () => setAlertModal(prev => ({...prev, isVisible: false})),
   //          onSubmit: () => router.navigate(`verify?_q=${res.data.params._q}&_verify_type=${res.data.params._verify_type}`),
   //          visibleClose: true,
   //          visibleSubmit: true,
   //       })
   //    }
   //    if (res.data.verify_type === 'CREDENTIALS_VERIFICATION'){
   //       await loadNotifications()
   //       router.replace('/home');
   //    }
   // };

   // const loadNotifications = async () => {
   //    const {data : notificationRespone} = useGetNotificationsAsyncQuery({_page: 1, _limit: 100 })
   //    console.log('[SIGNIN]::notificationRespone::',notificationRespone)
   // }

   // useEffect(() => {
   //    if (isSuccess) {
   //       router.replace('/home');
   //    }
   // }, [isSuccess]);

   

   return (
      <AuthLayout className="">
         <SafeAreaView>
            <View className="h-screen w-full flex justify-start items-center px-7">
               <svgIcons.LogoIcon width={200} height={150} />
               <Text className="w-full text-center text-4xl font-TenorSans-Regular mb-5">
                  WELLCOME
               </Text>
               <Text className="w-full text-center text-base font-Poppins-Light">
                  Log in to your account using email
               </Text>
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
                     <Link
                        className="text-xl underline font-TenorSans-Regular text-black"
                        href={'forget-password'}
                     >
                        Forgot Password?
                     </Link>
                  </View>
                  <Button
                     title="SIGN IN"
                     className="bg-black"
                     textStyles="text-white text-center text-xl font-TenorSans-Regular m-2"
                     onPress={form.handleSubmit(onSubmit)}
                  />
               </View>
               <View className="w-full flex flex-row justify-center mt-5 ">
                  <Text className="text-base font-Poppins-Regular">
                     Create an account?
                  </Text>
                  <Link
                     className="text-base font-Poppins-Bold text-blue-600"
                     href={'sign-up'}
                  >
                     {' '}
                     Sign Up
                  </Link>
               </View>
            </View>
            <AlertModal 
               isVisible={alertModal.isVisible} 
               message={alertModal.message} 
               type={alertModal.type} 
               onClose={alertModal.onClose} 
               onSubmit={alertModal.onSubmit}
               visibleClose={alertModal.visibleClose}
               visibleSubmit={alertModal.visibleSubmit}
            /> 
         </SafeAreaView>
      </AuthLayout>
   );
};

export default SignInScreen;
