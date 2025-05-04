import { Text, View, TextInput } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '@components/layouts/auth.layout';
import Button from '~/components/ui/Button';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useSendmailOtpAsyncQuery, useVerifiyEmailAsyncMutation } from '~/src/infrastructure/redux/apis/auth.api';
import { skipToken } from '@reduxjs/toolkit/query';
import { setAccessToken } from '~/src/infrastructure/redux/features/auth/auth.slice';
import AlertModal from '@components/ui/AlertModal';

const VerifyOTPScreen = () => {
   // OTP input state
   const [otp, setOtp] = useState(['', '', '', '', '', '']);
   const inputRefs = useRef<any>([]);

   // Timer state
   const [timer, setTimer] = useState(120);
   const [canResend, setCanResend] = useState(false);

   // Alert modal state
   const [alertModal, setAlertModal] = useState<{
      message: string;
      isVisible: boolean;
      type: 'SUCCESS' | 'ERROR' | 'WARNING';
      onClose: () => void
   }>({
      message: '',
      isVisible: false,
      type: 'SUCCESS',
      onClose: () => {}
   });

   const { _q, _verify_type } = useLocalSearchParams<{
      _q: string,
      _verify_type: string
   }>();

   const { data: verifiRes, refetch } = useSendmailOtpAsyncQuery(
      _q && _verify_type 
      ? {_q, _verify_type} 
      : skipToken
   );

   const [
      verifyAsync,
      { isLoading: isFetching, error: error, isSuccess, isError, reset },
   ] = useVerifiyEmailAsyncMutation();

   // Timer countdown effect
   useEffect(() => {
      if (timer > 0) {
         const countdown = setInterval(() => {
            setTimer((prev) => prev - 1);
         }, 1000);
         return () => clearInterval(countdown);
      } else {
         setCanResend(true);
      }
   }, [timer]);

   // OTP input handlers
   const handleOtpChange = (text: any, index: any) => {
      const newOtp = [...otp];
      newOtp[index] = text.replace(/[^0-9]/g, '');
      setOtp(newOtp);
      if (text && index < otp.length - 1) {
         inputRefs.current[index + 1].focus();
      }
      if (!text && index > 0) {
         inputRefs.current[index - 1].focus();
      }
   };

   const handleKeyPress = (e: any, index: any) => {
      if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
         inputRefs.current[index - 1].focus();
      }
   };

   // Action handlers
   const handleSubmit = async () => {
      const otpCode = otp.join('');
      if (otpCode.length === 6) {
         console.log('OTP Submitted:', otpCode);

         if (_q && _verify_type) {
            const res = await verifyAsync({
               q: _q,
               otp: otpCode,
            })
            if (res.data?.status == 200) {
               setAlertModal({
                  isVisible: true,
                  message: 'Verify email successfully!',
                  type: 'SUCCESS',
                  onClose: () => router.navigate('sign-in')
               })
            }
            if (res.data?.status == 400) {
               setAlertModal({
                  isVisible: true,
                  message: 'OTP not match',
                  type: 'ERROR',
                  onClose: () => setAlertModal(prev => ({...prev, isVisible: false}))
               })
            }
         }

         
      } else {
         setAlertModal({
            isVisible: true,
            message: 'Please enter a complete 6-digit OTP',
            type: 'WARNING',
            onClose: () => setAlertModal(prev => ({...prev, isVisible: false}))
         });
      }
   };
   
   const handleResend = () => {
      if (canResend) {
         setTimer(120);
         setCanResend(false);
         setAlertModal({
            isVisible: true,
            message: 'Resend OTP successfully. Check your email',
            type: 'SUCCESS',
            onClose: () => setAlertModal(prev => ({...prev, isVisible: false}))
         });
         refetch();
      }
   };

   return (
      <AuthLayout>
         <SafeAreaView className="h-screen">
            <View className="flex-1 flex justify-center items-center">
               {/* Title OTP verify */}
               <Text className="text-3xl font-Poppins-SemiBold mb-2">
                  Verify Your Code
               </Text>
               <Text className="text-base font-Poppins-Regular mb-2">
                  Enter the 6-digit code sent to your email/phone
               </Text>
               {/* OTP Input Fields */}
               <View className="flex flex-row gap-4">
                  {otp.map((digit, index) => (
                     <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl bg-gray-50"
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="numeric"
                        // maxLength={1}
                        autoFocus={index === 0} // Auto-focus on the first input
                     />
                  ))}
               </View>

               {/* Submit Button */}
               <Button
                  title="Verify OTP"
                  onPress={handleSubmit}
                  className="border px-10 py-3 rounded-md mt-7 text-base font-Poppins-Regular"
               />

               {/* Resend OTP Section */}
               <View className="flex flex-col items-center mt-7">
                  <Text className="text-base font-Poppins-Regular">
                     {timer > 0 ? `Resend in ${timer}s` : 'Can resend now'}
                  </Text>
                  {
                     timer == 0 ?
                        <Button
                        title="Resend OTP"
                        onPress={handleResend}
                        className="border px-10 py-3 rounded-md mt-7 text-base font-Poppins-Regular"
                        />
                     : 
                        <>
                        </>
                  }
               </View>

               {/* Back to Login Link */}
               <Link
                  href="sign-in"
                  className="mt-5 border-b font-Poppins-Medium"
               >
                  <Text>Back to Login</Text>
               </Link>
            </View>
            <AlertModal  message={alertModal.message} onClose={alertModal.onClose} type={alertModal.type} isVisible={alertModal.isVisible} />
         </SafeAreaView>
      </AuthLayout>
   );
};

export default VerifyOTPScreen;
