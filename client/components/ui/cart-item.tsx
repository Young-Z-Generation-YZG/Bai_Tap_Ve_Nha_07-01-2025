import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icons from '@constants/svg-icons';
import {
   addItemToCart,
   decreaseItemFromCart,
   clearCart,
} from '~/src/infrastructure/redux/features/app/cart.slice';
import { useDispatch } from 'react-redux';
import COLORS from '@constants/colors';

type CartItemProps = {
   // title?: string;
   // price: number;
   // imageUrl?: string;
   // size?:string;
   // quantity?: number;
   // slug?:string;
   product_id: string;
   product_slug: string;
   product_img: string;
   product_name: string;
   product_color: string;
   product_size: string;
   product_price: number;
   quantity: number;
   checkout?: boolean;
   // onChangeTotal:any;
};

const CartItem = (props: CartItemProps) => {
   const [counter, setCounter] = React.useState(props.quantity);

   const total = props.product_price * (props.quantity || 0);

   const dispatch = useDispatch();

   const handleUpdateQuantity = (updateValue: number) => {
      const {
         product_id,
         product_img,
         product_color,
         product_size,
         product_price,
         product_name,
         product_slug,
         quantity,
      } = props;

      // console.log("ADD TO CART SUCCESSFULLY")

      if (updateValue > 0) {
         // console.log("ADD SUCCESSFULLY")
         dispatch(
            addItemToCart({
               product_id,
               product_img,
               product_color,
               product_size,
               product_price,
               product_name,
               product_slug,
               quantity: updateValue,
            }),
         );
      } else {
         // console.log("DECREASE SUCCESSFULLY")
         dispatch(
            decreaseItemFromCart({
               product_id,
               product_img,
               product_color,
               product_size,
               product_price,
               product_name,
               product_slug,
               quantity,
            }),
         );
      }

      // props.onChangeTotal((prev:any) => prev + (product_price*updateValue));
      setCounter((prev) => prev + updateValue);
   };

   let colorHex = '';

   switch (props.product_color) {
      case 'GREEN':
         colorHex = COLORS.Green;
         break;
      case 'BROWN':
         colorHex = COLORS.Brown;
         break;
      case 'WHITE':
         colorHex = COLORS.White;
         break;
      case 'YELLOW':
         colorHex = COLORS.Yellow;
         break;
      default:
         colorHex = '#000'; // Fallback color
         break;
   }

   return (
      <View className="">
         <View className="flex flex-row gap-3">
            <View>
               <Image
                  source={{
                     uri: props.product_img,
                  }}
                  width={120}
                  height={144}
               />
            </View>

            <View>
               <Text className="w-full px-2 text-xl uppercase font-TenorSans-Regular">
                  {props.product_name}
               </Text>
               <View className="flex flex-row p-2 gap-[70px] ">
                  <View>
                     <View className="flex mt-2">
                        <View className="flex flex-row items-center gap-3">
                           <Text className="text-base font-TenorSans-Regular">
                              Color:
                           </Text>
                           <Icons.ColorCircle
                              width={28}
                              height={28}
                              outerCircleColor="#333"
                              innerCircleColor={colorHex}
                           />
                        </View>

                        <View className="flex flex-row items-center gap-3 mt-2">
                           <Text className="text-base font-TenorSans-Regular">
                              Size:
                           </Text>
                           <View className="relative">
                              <Icons.SizeCircleBlack width={26} height={26} />
                              <Text className="absolute text-base text-white font-TenorSans-Regular left-[8.5px] top-[2px]">
                                 {props.product_size}
                              </Text>
                           </View>
                        </View>

                        <View className="mt-4">
                           {props.checkout ? (
                              <View className="flex flex-row items-center">
                                 <Text className="text-xl font-TenorSans-Regular text-secondary">
                                    ${props.product_price} x {props.quantity}
                                 </Text>

                                 <Text className="text-xl font-TenorSans-Regular text-primary ml-[100px]">
                                    ${total}
                                 </Text>
                              </View>
                           ) : (
                              <View className="flex flex-row justify-between gap-5">
                                 <TouchableOpacity
                                    onPress={() => handleUpdateQuantity(-1)}
                                 >
                                    <AntDesignIcon
                                       name="minuscircleo"
                                       size={24}
                                       color="#3339"
                                    />
                                 </TouchableOpacity>
                                 <Text className="text-xl font-TenorSans-Regular">
                                    {counter}
                                 </Text>
                                 <TouchableOpacity
                                    onPress={() => handleUpdateQuantity(1)}
                                    // onPress={() => dispatch(clearCart())}
                                 >
                                    <AntDesignIcon
                                       name="pluscircleo"
                                       size={24}
                                       color="#3339"
                                    />
                                 </TouchableOpacity>
                              </View>
                           )}
                        </View>
                     </View>
                  </View>

                  <View className="items-end justify-end">
                     <Text className="font-TenorSans-Regular">Sub total:</Text>
                     <Text className="text-lg font-TenorSans-Regular text-secondary">
                        ${props.product_price * counter}
                     </Text>
                  </View>
               </View>
            </View>
         </View>
      </View>
   );
};

export default CartItem;

{
   /* <View className="p-2">
               <Text className="w-full text-xl uppercase font-TenorSans-Regular">
                  {props.title}
               </Text>

               <View className="flex mt-2">
                  <View className="flex flex-row items-center gap-3">
                     <Text className="text-base font-TenorSans-Regular">
                        Color:
                     </Text>
                     <Icons.ColorCircle
                        width={28}
                        height={28}
                        outerCircleColor="#333"
                        innerCircleColor="#DD8560"
                     />
                  </View>

                  <View className="flex flex-row items-center gap-3 mt-2">
                     <Text className="text-base font-TenorSans-Regular">
                        Size:
                     </Text>
                     <View className="relative">
                        <Icons.SizeCircleBlack width={26} height={26} />
                        <Text className="absolute text-base text-white font-TenorSans-Regular left-[8.5px] top-[2px]">
                           S
                        </Text>
                     </View>
                  </View>
               </View>

               <View className="mt-4">
                  {props.checkout ? (
                     <View className="flex flex-row items-center">
                        <Text className="text-xl font-TenorSans-Regular text-secondary">
                           ${props.price} x {props.quantity}
                        </Text>

                        <Text className="text-xl font-TenorSans-Regular text-primary ml-[100px]">
                           ${total}
                        </Text>
                     </View>
                  ) : (
                     <View className="flex flex-row justify-between gap-5 mr-[70px]">
                        <TouchableOpacity
                           onPress={() => setCounter(counter - 1)}
                        >
                           <AntDesignIcon
                              name="minuscircleo"
                              size={24}
                              color="#3339"
                           />
                        </TouchableOpacity>
                        <Text className="text-xl font-TenorSans-Regular">
                           {counter}
                        </Text>
                        <TouchableOpacity
                           onPress={() => setCounter(counter + 1)}
                        >
                           <AntDesignIcon
                              name="pluscircleo"
                              size={24}
                              color="#3339"
                           />
                        </TouchableOpacity>
                     </View>
                  )}
                  {/* <View className="">
                     <Text className="text-2xl text-secondary font-TenorSans-Regular">
                        ${props.price * counter}
                     </Text>
                  </View> */
}
//  </View>
// </View> */}
