import * as React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { TextInput, type TextInputProps, Text, View, Image } from "react-native";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface InputFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
  label?: string;
  labelStyles?: string;
  errorStyles?: string;
  containerStyles?: string;
  Icon?: any;
}

const InputField = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputFieldProps
>(
  (
    {
      name,
      control,
      error,
      label,
      labelStyles,
      className,
      errorStyles,
      containerStyles,
      placeholderClassName,
      Icon,
      ...props
    },
    ref
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View className={`${containerStyles}`}>
              {Icon? (
                <View className="w-full h-full pl-2 flex flex-row items-center overflow-hidden border rounded-2xl">
                  <Icon
                    height = {35}
                    width = {35}
                  />
                  <TextInput
                    id={name}
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className={cn(
                      "h-full w-[290px] px-2 text-lg leading-[1.25] text-foreground",
                      props.editable === false &&
                        "opacity-50 web:cursor-not-allowed",
                      className
                    )}
                    placeholderClassName={cn(
                      "text-muted-foreground",
                      placeholderClassName
                    )}
                    {...props}
                  />
                </View>
              ):(
                <View className="w-full h-fit">
                  {label&&
                    <Label className={`mb-2 ${labelStyles}`} id={name}>
                    {label}
                  </Label>}
                  <TextInput
                  id={name}
                  ref={ref}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className={cn(
                    "web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
                    props.editable === false &&
                      "opacity-50 web:cursor-not-allowed",
                    className
                  )}
                  placeholderClassName={cn(
                    "text-muted-foreground",
                    placeholderClassName
                  )}
                  {...props}
                  />
                </View>
              )}
              {error && (
                <Text className={`text-red-500 mt-2 ${errorStyles}`}>
                  {error.message}
                </Text>
              )}
            </View>
          );
        }}
      />
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
