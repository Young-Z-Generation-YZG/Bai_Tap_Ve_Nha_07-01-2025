import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>SignIn screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
