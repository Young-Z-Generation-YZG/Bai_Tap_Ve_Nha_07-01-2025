'use client'

import * as React from "react";
import { TextInput, type TextInputProps, Text, View, Image } from "react-native";
import Label from "~/components/ui/label";
import { cn } from "~/lib/utils";
import {
  type UseFormReturn,
  Controller,
  type Path,
  type FieldValues,
  type RegisterOptions,
} from 'react-hook-form';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { useState } from "react";


interface FieldInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  type?: 'text' | 'email' | 'password' | 'number' | 'color' | 'url';
  label?: string;
  variant?: "outline" | "primary"
  required?: boolean;
  className?: string;
  errorTextClassName?: string;
  errorStyles?: string;
  disabled?: boolean;
  visibleError?: boolean;
  editable?: boolean;
  Icon?: React.ComponentType<any>;
  fetchingFunc?: (data: any) => void;
  rules?: RegisterOptions;
  defaultValue?: string;
  placeholder?: string;
}

export function InputField<T extends FieldValues>({
  form,
  name,
  className = '',
  Icon,
  type = 'text',
  variant,
  required,
  editable = true,
  placeholder = '',
}: FieldInputProps<T>) {

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    formState: { errors },
  } = form;

  const errorMessage = errors[name]?.message as string | undefined;
  const hasError = !!errorMessage;

  return <Controller
    name={name}
    control={control}
    render={({ field: { onChange, onBlur, value } }) => {
      return (
        <View className={cn("h-16 border rounded-2xl mt-10", variant === "outline" && "border-slate-200 border-t-0 border-l-0 border-r-0 border-b rounded-none", className)}>
          {Icon ? (
            <View className="w-full h-full flex flex-row items-center pl-3">
              <Icon />
              <TextInput
                id={name}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={type === 'password' && !showPassword}
                autoCapitalize="none"

                placeholder={placeholder}
                className={cn(
                  "w-full h-full pl-2 text-xl text-foreground font-TenorSans-Regular pr-14",
                )}
                placeholderClassName={cn(
                  "text-muted-foreground",
                )}
                multiline={false}
              />
              {required && (
                <Text className="text-red-500 text-lg absolute right-3">*</Text>
              )}
              {type === 'password' && (
                <FeatherIcons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="black"
                  className="absolute right-8"
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </View>
          ) : (
            <View className={cn("h-full flex flex-row items-center justify-center px-3", variant === "outline" && "border-slate-200 border-t-0 border-l-0 border-r-0 border-b rounded-none")}>
              <TextInput
                id={name}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                secureTextEntry={type === 'password'}
                placeholder={placeholder}
                multiline={false}
                className={cn(
                  "w-full h-full pl-2 text-xl text-foreground font-TenorSans-Regular",
                  editable === false &&
                  "opacity-50 web:cursor-not-allowed",
                  className
                )}
                placeholderClassName={cn(
                  "text-muted-foreground",
                )}
              />
              {required && (
                <Text className="text-red-500 text-lg absolute right-3">*</Text>
              )}
            </View>
          )}
          {hasError && (
            <Text className={`text-red-500 mt-2`}>
              {errorMessage}
            </Text>
          )}
        </View>
      );
    }}
  />
}