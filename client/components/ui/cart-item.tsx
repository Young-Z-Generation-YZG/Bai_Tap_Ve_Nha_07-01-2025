import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icons from '@constants/svg-icons';
import { useDispatch } from 'react-redux';
import {
   setAddProduct,
   setRemoveProduct,
   setUpdateQuantity,
} from '~/src/infrastructure/redux/features/app/cart.slice';
import { useAppSelector } from '~/src/infrastructure/redux/store';

type CartItemProps = {
   _id: string;
   name: string;
   size?: string;
   color?: string;
   price: number;
   imageUrl: string;
   checkout?: boolean;
   // onChangeTotal:any;
};

const CartItem = (props: CartItemProps) => {
   const [counter, setCounter] = React.useState(props.quantity);

   const total = props.product_price * (props.quantity || 0);

   const dispatch = useDispatch();

   const handleUpdateQuantity = (updateValue: number) => {

      const {
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
         dispatch(addItemToCart({
            product_img,
            product_color,
            product_size,
            product_price,
            product_name,
            product_slug,
            quantity: updateValue
         }))
      }
      else {
         // console.log("DECREASE SUCCESSFULLY")
         dispatch(decreaseItemFromCart({
            product_img,
            product_color,
            product_size,
            product_price,
            product_name,
            product_slug,
            quantity,
         }))
      }


      // props.onChangeTotal((prev:any) => prev + (product_price*updateValue));
      setCounter(prev => prev + updateValue);
   }


   let colorHex = '';

   switch (props.product_color) {
      case 'Green':
         colorHex = COLORS.Green;
         break;
      case 'Brown':
         colorHex = COLORS.Brown;
         break;
      case 'White':
         colorHex = COLORS.White;
         break;
      case 'Yellow':
         colorHex = COLORS.Yellow;
         break;
      default:
         colorHex = '#000'; // Fallback color
         break;
   }

   const dispatch = useDispatch();
   const cart = useAppSelector((state) => state.cart.cart);

   const dispatch = useDispatch();
   const cart = useAppSelector((state) => state.cart.cart);

   return (
      <View key={props._id}>
         <View className="flex flex-row gap-3">
            <View>
               <Image
                  source={{
                     uri: props.product_img,
                  }}
                  width={120}
                  height={174}
               />
            </View>

            <View className="flex flex-row gap-[50px] w-screen p-2">
               <View>
                  <Text className="w-[120px] text-base text-wrap font-TenorSans-Regular">
                     {props.name}
                  </Text>

                  <View className="flex">
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
                              {props.size}
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
                           <View className="flex flex-row justify-between w-[100px]">
                              <TouchableOpacity
                                 onPress={() => {
                                    if (
                                       cart.find(
                                          (item) =>
                                             item.product_id === props._id,
                                       )?.quantity === 1
                                    ) {
                                       dispatch(setRemoveProduct(props._id));
                                       return;
                                    }

                                    dispatch(
                                       setUpdateQuantity({
                                          product_id: props._id,
                                          quantity:
                                             (cart.find(
                                                (item) =>
                                                   item.product_id ===
                                                   props._id,
                                             )?.quantity ?? 0) - 1,
                                       }),
                                    );
                                 }}
                              >
                                 <AntDesignIcon
                                    name="minuscircleo"
                                    size={24}
                                    color="#3339"
                                 />
                              </TouchableOpacity>
                              <Text className="text-xl font-TenorSans-Regular">
                                 {cart.find(
                                    (item) => item.product_id === props._id,
                                 )?.quantity || 1}
                              </Text>
                              <TouchableOpacity
                                 onPress={() => {
                                    dispatch(
                                       setUpdateQuantity({
                                          product_id: props._id,
                                          quantity:
                                             (cart.find(
                                                (item) =>
                                                   item.product_id ===
                                                   props._id,
                                             )?.quantity ?? 0) + 1,
                                       }),
                                    );
                                 }}
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
                     $
                     {(cart.find((item) => item.product_id === props._id)
                        ?.quantity ?? 1) * props.price}
                  </Text>
               </View >
            </View >
         </View >
      </View >
   );
};

export default CartItem;
