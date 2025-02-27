import { View, Text } from "react-native";
import React, { useState } from "react";
import AuthLayout from "~/components/layouts/Auth.layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Info } from "~/lib/icons/Info";
import { Button } from "~/components/ui/button";
import { InputField } from "~/components/ui/input-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormType, loginResolver } from "~/src/domain/schemas/auth.schema";
import { router } from "expo-router";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

const SignInScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormType>({
    resolver: loginResolver,
    defaultValues: {
      email: "user@gmail.com",
      password: "1",
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (
    data: LoginFormType
  ) => {
    try {
      setIsSubmitting(true);

      console.log(data);

      await new Promise((resolve) => setTimeout(resolve, 500));

      alert("Login success");

      router.push("/home");
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <View className="items-center justify-center flex-1 gap-5 p-6 bg-secondary/30">
        <Card className="w-full max-w-sm p-6 rounded-2xl">
          <CardHeader className="items-center">
            <Avatar alt="Rick Sanchez's Avatar" className="w-24 h-24">
              <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
              <AvatarFallback>
                <Text>RS</Text>
              </AvatarFallback>
            </Avatar>
            <View className="p-3" />
            <CardTitle className="pb-2 text-center">Lê Xuân Bách</CardTitle>
            <View className="flex-row">
              <CardDescription className="text-base font-semibold">
                Administrator
              </CardDescription>
              <Tooltip delayDuration={150}>
                <TooltipTrigger className="px-2 pb-0.5 active:opacity-50">
                  <Info
                    size={14}
                    strokeWidth={2.5}
                    className="w-4 h-4 text-foreground/70"
                  />
                </TooltipTrigger>
                <TooltipContent className="px-4 py-2 shadow">
                  <Text className="native:text-lg">Fullstack Developer</Text>
                </TooltipContent>
              </Tooltip>
            </View>
          </CardHeader>
          <CardContent className="">
            <InputField
              name="email"
              label="Email"
              control={control}
              error={errors.email}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isSubmitting}
            />

            <InputField
              name="password"
              label="Password"
              control={control}
              error={errors.password}
              secureTextEntry
              autoCapitalize="none"
              containerStyles="mt-4"
              editable={!isSubmitting}
            />
          </CardContent>

          <Button
            variant="default"
            className="shadow shadow-foreground/5"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-bold text-primary-foreground">
              {isSubmitting ? "Submitting..." : "Login as admin"}
            </Text>
          </Button>
        </Card>
      </View>
    </AuthLayout>
  );
};

export default SignInScreen;
