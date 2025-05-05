import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { svgIcons } from '~/constants';
import Button from '~/components/ui/Button';
import { router } from 'expo-router';
import { useGetCategoriesAsyncQuery } from '~/src/infrastructure/redux/apis/category.api';
import { CategoryItemType } from '~/src/infrastructure/types/category.type';
import { useDispatch } from 'react-redux';
import { logout } from '~/src/infrastructure/redux/features/auth/auth.slice';
import { clearNotifications } from '~/src/infrastructure/redux/features/app/notification.slice';
import { useAppSelector } from '~/src/infrastructure/redux/store';

type TransformedCategory = {
   _id: string;
   category_name: string;
   category_slug: string;
   subcategories?: CategoryItemType[];
};

export default function DrawerContent(props: any) {
   const dispatch = useDispatch();
   const { userId } = useAppSelector(state => state.auth);
   const [txtIdExpandCategory, setTxtIdExpandCategory] = useState(null);
   const [categoriesData, setCategoriesData] = useState<TransformedCategory[]>([]);

   const toggleCategory = (categoryId: any) => {
      setTxtIdExpandCategory(
         txtIdExpandCategory === categoryId ? null : categoryId,
      );
   };

   const handleLogout = () => {
      dispatch(logout());
      dispatch(clearNotifications())
      router.push('/sign-in');
   };

   const {
      data: categoriesResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetCategoriesAsyncQuery();

   useEffect(() => {
      if (categoriesResponse?.data) {
         // setCategoriesData(categoriesResponse.data);
         const categories = categoriesResponse.data;

         const parentCategories = categories.filter(
            (category) => category.category_parentId === null,
         );

         const transformedCategories = parentCategories.map((parent) => {
            const children = categories.filter(
               (cat) => cat.category_parentId === parent._id,
            );

            return {
               _id: parent._id,
               category_name: parent.category_name,
               category_slug: parent.category_slug,
               subcategories: children,
            };
         });

         // console.log('TRANFORMED CATEGORIES', transformedCategories);

         setCategoriesData(transformedCategories);
      }
   }, [categoriesResponse]);

   return (
      <View className="flex flex-col w-full h-full">
         <View className="relative flex-none w-full h-fit">
            <View className="flex items-center">
               <svgIcons.LogoIcon width={140} height={70} />
            </View>
            <View className="absolute right-4 top-4">
               <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                  <svgIcons.CloseIcon width={40} height={40} />
               </TouchableOpacity>
            </View>
         </View>

         <ScrollView className="flex-1 w-full">
            {categoriesData.map((category, index) => (
               <View key={category._id} className="flex flex-col">
                  <TouchableOpacity
                     className="flex flex-row justify-between px-6 py-3 border-[0.5px] border-gray-200"
                     onPress={() => {
                        if (category.subcategories && category.subcategories.length > 0) {
                           toggleCategory(category._id);
                        } else {
                           props.navigation.navigate(category.category_slug);
                        }
                     }}
                  >
                     <Text className="text-2xl font-TenorSans-Regular">
                        {category.category_name}
                     </Text>
                     {category.subcategories && (
                        <Text>
                           {txtIdExpandCategory === category._id ? (
                              <svgIcons.ArrowDownIcon width={15} height={15} />
                           ) : (
                              <svgIcons.ArrowLeftIcon width={15} height={15} />
                           )}
                        </Text>
                     )}
                  </TouchableOpacity>
                  {category.subcategories &&
                     txtIdExpandCategory === category._id && (
                        <View className="bg-gray-100 ">
                           {category.subcategories.map((subItem, subIndex) => (
                              <TouchableOpacity
                                 key={subIndex}
                                 className="py-4 pl-10 border-b border-b-slate-300/50"
                                 onPress={() =>
                                    props.navigation.navigate(subItem.category_slug)
                                 }
                              >
                                 <Text className="text-xl font-TenorSans-Regular">
                                    {subItem.category_name}
                                 </Text>
                              </TouchableOpacity>
                           ))}
                        </View>
                     )}
               </View>
            ))}
         </ScrollView>

         <View className="flex flex-col flex-none w-full gap-5 py-5 px-7">
            <View className="flex flex-row items-center w-full gap-3">
               <svgIcons.TelephoneIcon width={25} height={25} />
               <Text className="text-xl font-TenorSans-Regular">
                  0912-345-678
               </Text>
            </View>
            <View className="flex flex-row items-center w-full gap-3">
               <svgIcons.LocationIcon width={25} height={25} />
               <Text className="text-xl font-TenorSans-Regular">
                  01 Vo Van Ngan, Thu Duc, HCM city
               </Text>
            </View>
            <View className="flex flex-row items-center justify-center w-full gap-10">
               <svgIcons.TwitterIcon width={30} height={30} />
               <svgIcons.InstagramIcon width={30} height={30} />
               <svgIcons.YoutubeIcon width={30} height={30} />
            </View>
         </View>

         <View className="flex flex-col flex-none w-full gap-5 py-5 px-7">
            {/* <Button
               title="MY PROFILE"
               className="bg-black rounded-none"
               textStyles="text-white text-xl font-TenorSans-Regular"
               onPress={() => router.push('profile')}
            /> */}
            {
               userId &&
               <Button
                  title="SIGN OUT"
                  className="bg-black rounded-none"
                  textStyles="text-white text-xl font-TenorSans-Regular"
                  onPress={handleLogout}
               />
            }
         </View>
      </View>
   );
}
