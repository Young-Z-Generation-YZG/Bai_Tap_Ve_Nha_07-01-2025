// import { ScrollView, Text, View, StyleSheet } from "react-native";
// import React, { useRef, useState, useEffect } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AuthLayout from "@components/layouts/auth.layout";
// import { useForm } from "react-hook-form";
// import { InputField } from "~/components/ui/input-field";
// import SvgIcons from "~/constants/svg-icons"; 
// import Button from "~/components/ui/Button";
// import { Link } from "expo-router";

// const VerifyOTPScreen = () => {
//   const { control, handleSubmit } = useForm();
//   const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6-digit OTP
//   const inputRefs = useRef([]);
  
//   // Timer for resend OTP
//   const [timer, setTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);

//   // Handle input change and auto-focus
//   const handleOtpChange = (text:any, index:any) => {
//     const newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     // Move to next input if a digit is entered
//     if (text && index < 5) {
//       // inputRefs.current[index + 1].focus();
//     }
//     // Move to previous input if backspace
//     if (!text && index > 0) {
//       // inputRefs.current[index - 1].focus();
//     }
//   };

//   // Timer countdown
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(countdown);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   const onSubmit = () => {
//     const otpCode = otp.join('');
//     if (otpCode.length === 6) {
//       // Handle OTP verification logic here
//       console.log('OTP Submitted:', otpCode);
//     } else {
//       alert('Please enter a complete 6-digit OTP');
//     }
//   };

//   const handleResend = () => {
//     if (canResend) {
//       // Add resend OTP API call here
//       setTimer(60);
//       setCanResend(false);
//       console.log('Resending OTP...');
//     }
//   };

//   return (
//     <AuthLayout className="">
//       <SafeAreaView style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <Text style={styles.title}>Verify Your Code</Text>
//           <Text style={styles.subtitle}>
//             Enter the 6-digit code sent to your email/phone
//           </Text>

//           {/* OTP Input Fields */}
//           <View style={styles.otpContainer}>
//             {otp.map((digit, index) => (
//               <InputField
//                 key={index}
//                 control={control}
//                 name={`otp${index}`}
//                 value={digit}
//                 onChangeText={(text) => handleOtpChange(text, index)}
//                 keyboardType="numeric"
//                 maxLength={1}
//                 style={styles.otpInput}
//                 inputRef={(ref) => (inputRefs.current[index] = ref)}
//                 autoFocus={index === 0}
//               />
//             ))}
//           </View>

//           {/* Submit Button */}
//           <Button
//             title="Verify OTP"
//             onPress={handleSubmit(onSubmit)}
//             // style={styles.submitButton}
//           />

//           {/* Resend OTP Section */}
//           <View style={styles.resendContainer}>
//             <Text style={styles.timerText}>
//               {timer > 0 ? `Resend in ${timer}s` : 'Can resend now'}
//             </Text>
//             <Button
//               title="Resend OTP"
//               onPress={handleResend}
//               // disabled={!canResend}
//               // variant="ghost"
//               // style={styles.resendButton}
//             />
//           </View>

//           {/* Back to Login Link */}
//           <Link href="/login" style={styles.backLink}>
//             <Text>Back to Login</Text>
//           </Link>
//         </ScrollView>
//       </SafeAreaView>
//     </AuthLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginBottom: 30,
//   },
//   otpInput: {
//     width: 45,
//     height: 45,
//     textAlign: 'center',
//     borderWidth: 1,
//     borderRadius: 8,
//     borderColor: '#ccc',
//   },
//   submitButton: {
//     width: '80%',
//     marginBottom: 20,
//   },
//   resendContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   timerText: {
//     color: '#666',
//     marginBottom: 10,
//   },
//   resendButton: {
//     width: '60%',
//   },
//   backLink: {
//     color: '#0066cc',
//     textDecorationLine: 'underline',
//   },
// });

// export default VerifyOTPScreen;