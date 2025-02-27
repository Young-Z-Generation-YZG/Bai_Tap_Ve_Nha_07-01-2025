import { View, Text } from "react-native";
import React from "react";
import AuthLayout from "~/components/layouts/Auth.layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import Animated, { LayoutAnimationConfig } from "react-native-reanimated";
import { router } from "expo-router";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

const SignUpScreen = () => {
  return (
    <AuthLayout>
      <View>
        <Text>Sign in</Text>
      </View>
    </AuthLayout>
  );
};

export default SignUpScreen;
