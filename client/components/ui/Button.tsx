import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { cn } from '~/lib/utils';

export type ButtonProps = {
   title: string;
   // styles
   className?: string;
   textStyles?: string;
   // states
   isLoading?: boolean;
   // actions
   onPress?: () => void;
   icon?: any;
};

const Button = (props: ButtonProps) => {
   return (
      <TouchableOpacity
         onPress={props.onPress}
         disabled={props.isLoading}
         activeOpacity={0.7}
         className={cn(
            'w-max h-max py-2 px-5 rounded-full flex flex-row items-center justify-center',
            props.className,
         )}
      >
         {props.icon && <props.icon width={30} height={30} />}
         <Text className={` ${props.textStyles}`}>{props.title}</Text>
      </TouchableOpacity>
   );
};

export default Button;

const styles = StyleSheet.create({});
