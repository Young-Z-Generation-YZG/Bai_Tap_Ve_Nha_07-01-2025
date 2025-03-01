import { View, Text, StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { svgIcons } from '~/constants';
import Button from '~/components/ui/Button';
import { router } from 'expo-router';

// Sample category data structure
const categories = [
  {
    title: 'New',
    subcategories: [
      { title: "Test", route: 'sub-menu-item' },
    ],
  },
  {
    title: 'Apparel',
    subcategories: [
      { title: "Outer", route: 'sub-menu-item' },
      { title: "Dress", route: 'sub-menu-item' },
      { title: "Blouse/Shirt", route: 'sub-menu-item' },
      { title: "T-Shirt", route: 'sub-menu-item' },
      { title: "Knitwear", route: 'sub-menu-item' },
      { title: "Skirt", route: 'sub-menu-item' },
      { title: "Pants", route: 'sub-menu-item' },
      { title: "Denim", route: 'sub-menu-item' },
      { title: "Kids", route: 'sub-menu-item' },
    ],
  },
  {
    title: 'Bag',
    subcategories: [
      { title: "Test", route: 'sub-menu-item' },
    ],
  },
  {
    title: 'Shoes',
    subcategories: [
      { title: "Test", route: 'sub-menu-item' },
    ],
  },
  {
    title: 'Beauty',
    subcategories: [
      { title: "Test", route: 'sub-menu-item' },
    ],
  },
  {
    title: 'Accessories',
    subcategories: [
      { title: "Test", route: 'sub-menu-item' },
    ],
  },
  {
    title: 'Test',
    route: 'sub-menu-item',
  },
];

// Custom Drawer Content Component
export default function  CustomDrawerContent (props:any) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryTitle:any) => {
    setExpandedCategory(
      expandedCategory === categoryTitle ? null : categoryTitle
    );
  };

  return (
    <View className='w-full h-full flex flex-col'>
      {/* HEADER MENU */}
      <View className='w-full h-fit flex-none relative'>
        <View className='flex items-center'>
          <svgIcons.LogoIcon
            width={140}
            height={70}
          />
        </View>
        <View className='absolute right-4 top-4'>
          <TouchableOpacity 
            onPress={()=>props.navigation.closeDrawer()}
          >
            <svgIcons.CloseIcon
              width={40}
              height={40}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ALL CATEGORIES */}
      <ScrollView className='w-full flex-1'>
        {categories.map((category, index) => (
          <View key={index} className='flex flex-col'>
            <TouchableOpacity
              className='flex flex-row justify-between px-6 py-3 border-[0.5px] border-gray-200'
              onPress={() => {
                if (category.subcategories) {
                  toggleCategory(category.title);
                } else {
                  props.navigation.navigate(category.route);
                }
              }}
            >
              <Text className='text-2xl font-TenorSans-Regular'>{category.title}</Text>
              {/* check if this have subcategories */}
              {category.subcategories && (
                <Text>
                  {expandedCategory === category.title ? (
                    // '▼'
                    <svgIcons.ArrowDownIcon
                      width={15}
                      height={15}
                    />
                  ):(
                    // '▶'
                    <svgIcons.ArrowLeftIcon
                      width={15}
                      height={15}
                    />
                  )}
                </Text>
              )}
            </TouchableOpacity>
            {/* sub categories */}
            {category.subcategories && expandedCategory === category.title && (
              <View className='bg-gray-100'>
                {category.subcategories.map((subcat, subIndex) => (
                  <TouchableOpacity
                    key={subIndex}
                    className='py-4 pl-10'
                    onPress={() => props.navigation.navigate(subcat.route)}
                  >
                    <Text className='text-xl font-TenorSans-Regular'>{subcat.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* SHOP INFO */}
      <View className='w-full flex-none flex flex-col gap-5 py-5 px-7'>
        <View className='w-full flex flex-row gap-3 items-center'>
          <svgIcons.TelephoneIcon
            width={25}
            height={25}
          />
          <Text className='text-xl font-Poppins-Light'>0912-345-678</Text>
        </View>
        <View className='w-full flex flex-row gap-3 items-center'>
          <svgIcons.LocationIcon
            width={25}
            height={25}
          />
          <Text className='text-xl font-Poppins-Light'>01 Vo Van Ngan, Thu Duc, HCM city</Text>
        </View>
        <View className='w-full flex flex-row gap-10 items-center justify-center'>
          <svgIcons.TwitterIcon
            width={30}
            height={30}
          />
          <svgIcons.InstagramIcon
            width={30}
            height={30}
          />
          <svgIcons.YoutubeIcon
            width={30}
            height={30}
          />
        </View>
      </View>

      {/* PROFILE */}
      <View className='w-full flex-none flex flex-col gap-5 py-5 px-7'>
        <Button
          title='MY PROFILE'
          className='bg-black rounded-none'
          textStyles='text-white text-xl font-Poppins-Light'
          onPress={()=>router.navigate('profile')}
        />
        <Button
          title='SIGN OUT'
          className='bg-black rounded-none'
          textStyles='text-white text-xl font-Poppins-Light'
          onPress={()=>router.navigate('sign-in')}
        />
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   categoryItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   categoryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   arrow: {
//     fontSize: 16,
//   },
//   subcategoryContainer: {
//     backgroundColor: '#f9f9f9',
//   },
//   subcategoryItem: {
//     padding: 15,
//     paddingLeft: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   subcategoryText: {
//     fontSize: 14,
//   },
// });
   