import { ScrollView, Text, View, StyleSheet, TextInput } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthLayout from "@components/layouts/auth.layout";
import { useForm } from "react-hook-form";
import { InputField } from "~/components/ui/input-field";
import SvgIcons from "~/constants/svg-icons"; 
import Button from "~/components/ui/Button";
import { Link } from "expo-router";

const VerifyOTPScreen = () => {
  // Array for 6 OTP code
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<any>([]);
  
  // Timer for resend OTP
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Handle input change and auto-focus
  const handleOtpChange = (text:any, index:any) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Handle backspace or clearing input
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // // Handle backspace or clearing input
  // const handleKeyPress = (e:any, index:any) => {
  //   console.log(e.nativeEvent.key);
  //   if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
  //     inputRefs.current[index - 1].focus();
  //   }
  // };

  // Timer countdown
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

  const handleSubmit = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      // Handle OTP verification logic here
      console.log('OTP Submitted:', otpCode);
    } else {
      alert('Please enter a complete 6-digit OTP');
    }
  };

  const handleResend = () => {
    if (canResend) {
      // Add resend OTP API call here
      setTimer(60);
      setCanResend(false);
      console.log('Resending OTP...');
    }
  };

  return (
    <AuthLayout className="">
      <SafeAreaView className="">
        <View className="h-full w-full flex justify-center items-center">
          <Text className="text-3xl font-Poppins-SemiBold mb-2">Verify Your Code</Text>
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
                // onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
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
            <Button
              title="Resend OTP"
              onPress={handleResend}
              className="text-base font-Poppins-Regular"
            />
          </View>

          {/* Back to Login Link */}
          <Link href="sign-in">
            <Text>Back to Login</Text>
          </Link>
        </View>
      </SafeAreaView>
    </AuthLayout>
  );
};

export default VerifyOTPScreen;