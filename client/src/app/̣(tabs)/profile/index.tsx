import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthLayout from '@components/layouts/auth.layout';
import { Link, router, Stack } from 'expo-router';
import { Image } from 'react-native';
import { images, svgIcons } from '~/constants';
import {
   Ionicons,
   MaterialIcons,
   FontAwesome5,
   Feather,
   MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import { concat } from 'lodash';

const ProfileScreen = () => {
   const { userId } = useAppSelector(state => state.auth)

   useEffect(() => {
      if (!userId){
         router.replace({ pathname: "sign-in", params: { prevScreen:  'profile' } });
      }
   },[userId])

   return (
      <AuthLayout>
         <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 mt-5">
               {/* Profile Card */}
               <View
                  className="mx-4 my-2 p-4 bg-white rounded-2xl flex flex-row items-center gap-5"
                  style={{ shadowColor: 'black', elevation: 10 }}
               >
                  <Image
                     source={images.profile}
                     className="w-16 h-16 rounded-full"
                  />
                  <View className="flex-1">
                     <Text className="text-xl font-Poppins-Bold">User</Text>
                     <Text className="text-gray-500 font-Poppins-Light">
                        usetest@gmail.com
                     </Text>
                  </View>
               </View>

               {/* Menu Options */}
               <View className="mx-4 my-3 bg-white rounded-2xl border-2 border-gray-300">
                  <TouchableOpacity
                     className="flex-row items-center p-4 border-b border-gray-100"
                     onPress={() => router.push('/profile/profile-detail')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <Ionicons
                           name="person-outline"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Personal Details
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                     className="flex-row items-center p-4 border-b border-gray-100"
                     onPress={() => router.push('/profile/address')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <MaterialCommunityIcons
                           name="truck-outline"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Shipping Address
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                     className="flex-row items-center p-4 border-b border-gray-100"
                     onPress={() => router.push('/profile/invoices')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <Feather name="shopping-bag" size={22} color="black" />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Invoices
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                     className="flex-row items-center p-4 border-b border-gray-100"
                     onPress={() => router.push('/profile/wishlist')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <Ionicons
                           name="heart-outline"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Wishlist
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                     className="flex-row items-center p-4 border-b border-gray-100"
                     onPress={() => router.push('/profile/vouchers')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <MaterialCommunityIcons
                           name="ticket-percent-outline"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Vouchers
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                     className="flex-row items-center p-4"
                     onPress={() => router.push('/settings')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <Ionicons
                           name="settings-outline"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Settings
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>
               </View>

               {/* Additional links */}
               <View className="mx-4 my-3 bg-white rounded-2xl border-2 border-gray-300">
                  <TouchableOpacity
                     className="flex-row items-center p-4 border-b border-gray-100"
                     onPress={() => router.push('/faqs')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <Ionicons
                           name="information-circle-outline"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        FAQs
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                     className="flex-row items-center p-4"
                     onPress={() => router.push('/privacy-policy')}
                  >
                     <View className="w-10 h-10 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <MaterialIcons
                           name="security"
                           size={22}
                           color="black"
                        />
                     </View>
                     <Text className="flex-1 text-lg font-TenorSans-Regular">
                        Privacy Policy
                     </Text>
                     <Ionicons name="chevron-forward" size={20} color="black" />
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </SafeAreaView>
      </AuthLayout>
   );
};

export default ProfileScreen;
