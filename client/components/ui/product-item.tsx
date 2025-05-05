import FeatherIcon from 'react-native-vector-icons/Feather';
import { ProductItemType } from '~/src/infrastructure/types/product.type';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import {
   addWishList,
   removeWishList,
} from '~/src/infrastructure/redux/features/app/wishlist.slice';

type ProductItemProps = {
   id: string;
   title: string;
   description?: string;
   price: number;
   imageUrl: string;
   slug: string;
   category: string;
   brand: string;
};

const ProductItem = (props: ProductItemProps) => {

   console.log(props.imageUrl)

   const wishlist = useAppSelector((state) => state.wishlist);

   const dispatch = useDispatch();

   const [isWishlist, setIsWishlist] = useState(false);

   useEffect(() => {
      var check = undefined;
      check = wishlist.items.find((item) => item.id === props.id);
      if (check) {
         setIsWishlist(true);
      } else {
         setIsWishlist(false);
      }
   }, []);

   const handleAddWishList = () => {
      // console.log(props.id,props.imageUrl,)
      if (!isWishlist) {
         setIsWishlist(true);
         dispatch(
            addWishList({
               id: props.id,
               product_img: props.imageUrl,
               product_name: props.title,
               product_slug: props.slug,
               product_price: props.price,
               product_brand: props.brand,
               category_name: props.category,
            }),
         );
      } else {
         setIsWishlist(false);
         dispatch(removeWishList(props.id));
      }
   };
   return (
      <View>
         <View className="relative">
            <Image
               source={{
                  uri: props.imageUrl,
               }}
               style={{ width: '100%', height: 240 }}
               resizeMode="cover"
            />

            <TouchableOpacity onPress={handleAddWishList}>
               {isWishlist ? (
                  <FontAwesomeIcon
                     name="heart"
                     size={20}
                     color="#FF8383"
                     className="absolute bottom-2 right-2 "
                  />
               ) : (
                  <FontAwesomeIcon
                     name="heart-o"
                     size={20}
                     color="#DD855F"
                     className="absolute bottom-2 right-2 "
                  />
               )}
            </TouchableOpacity>
         </View>
         <View className="px-1 mt-1">
            <Text className="text-base font-TenorSans-Regular">
               {props.title}
            </Text>
            <Text className="text-sm font-TenorSans-Regular">
               {props.description}
            </Text>
            <Text className="mt-2 text-xl text-secondary font-TenorSans-Regular">
               ${props.price}
            </Text>
         </View>
      </View>
   );
};

export default ProductItem;
