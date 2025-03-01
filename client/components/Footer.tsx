import { View, Text, Image } from 'react-native'
import React from 'react'
import { images, svgIcons } from '~/constants'

export default function Footer() {
  return (
    <View className='w-full'>      
      <View className='w-full flex items-center px-[45px]'>
        <svgIcons.LogoIcon 
          width={120}
          height={60}
        />
        <Text className='text-center text-lg font-TenorSans-Regular tracking-tighter mt-1'>
          Making a luxurious lifestyle accessible for a generous group of women is our daily drive.
        </Text>
      </View>

      <View className='border-b border-gray-300 mx-[100px] my-10'/>

      <View className='w-full flex flex-col px-4 gap-5'>
        <View className='w-full flex flex-row gap-5'>
          <View className='flex flex-col flex-1 items-center'>
            <svgIcons.ShippingIcon 
              width={60}
              height={60}
            />
            <Text className='text-center text-base font-TenorSans-Regular'>Fast shipping. Free on orders over $25.</Text>
          </View>
          <View className='flex flex-col flex-1 items-center'>
            <svgIcons.SustainableIcon 
              width={60}
              height={60}
            />
            <Text className='text-center text-base font-TenorSans-Regular'>Sustainable process from start to finish.</Text>
          </View>
        </View>
        <View className='w-full flex flex-row gap-5'>
        <View className='flex flex-col flex-1 items-center'>
            <svgIcons.UniqueDesignIcon 
              width={60}
              height={60}
            />
            <Text className='text-center text-base font-TenorSans-Regular'>Unique designs and high-quality materials.</Text>
          </View>
          <View className='flex flex-col flex-1 items-center'>
            <svgIcons.FastShippingIcon 
              width={60}
              height={60}
            />
            <Text className='text-center text-base font-TenorSans-Regular'>Fast shipping. Free on orders over $25.</Text>
          </View>
        </View>
      </View>

      <View className='border-b border-gray-300 mx-[100px] my-10'/>

      <View className='w-full'>
        <Text className='text-3xl font-TenorSans-Regular text-center'>FOLLOW US</Text>
        {/* 4 pictures */}
        <View className='w-full flex flex-col gap-4 mt-4'>
          <View className='flex flex-row gap-4 justify-center'>
            <Image
              source={images.footer01}
              className="w-[180px] h-[180px]"
              resizeMode='contain'
            />
            <Image
              source={images.footer02}
              className="w-[180px] h-[180px]"
              resizeMode='contain'
            />
          </View>
          <View className='flex flex-row gap-4 justify-center'>
            <Image
              source={images.footer03}
              className="w-[180px] h-[180px]"
              resizeMode='contain'
            />
            <Image
              source={images.footer04}
              className="w-[180px] h-[180px]"
              resizeMode='contain'
            />
          </View>
        </View>
        {/* 3 icons */}
        <View className='w-full flex flex-row gap-10 items-center justify-center mt-10'>
          <svgIcons.TwitterIcon
            width={28}
            height={28}
          />
          <svgIcons.InstagramIcon
            width={28}
            height={28}
          />
          <svgIcons.YoutubeIcon
            width={28}
            height={28}
          />
        </View>
      </View>

      <View className='border-b border-gray-300 mx-[100px] my-10'/>

      <View className='w-full'>
        <Text className='text-xl font-TenorSans-Regular text-center'>support@openfashion.com </Text>
        <Text className='text-xl font-TenorSans-Regular text-center'>+91 12345 67890 </Text>
        <Text className='text-xl font-TenorSans-Regular text-center'>08:00-22:00 Everyday </Text>
      </View>

      <View className='border-b border-gray-300 mx-[100px] my-10'/>

      <View className='w-full flex flex-row justify-center gap-10'>
        <Text className='text-xl font-TenorSans-Regular'>About</Text>
        <Text className='text-xl font-TenorSans-Regular'>Contact</Text> 
        <Text className='text-xl font-TenorSans-Regular'>Blog</Text> 
      </View>

      <View className='w-full h-10 flex items-center justify-center mt-10 bg-gray-100'>
        <Text className='text-sm font-TenorSans-Regular'>
          Copyright© artrivedi All Rights Reserved.
        </Text>
      </View>
     
    </View>
  )
}