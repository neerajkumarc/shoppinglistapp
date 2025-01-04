import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/bodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const SignInScreen = () => {
  const { isLoaded, setActive, signIn } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const onSignInPress = async () => {};

  if (!isLoaded) {
    return null;
  }
  return (
    <BodyScrollView style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <TextInput
        label="Email"
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmailAddress}
        value={emailAddress}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button
        onPress={onSignInPress}
        disabled={!emailAddress || !password || isSigningIn}
        loading={isSigningIn}
      >
        Sign In
      </Button>

      <View
        style={{
          marginTop: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedText>Not registered yet?</ThemedText>
        <Button variant="ghost" onPress={() => router.push("/sign-up")}>
          Sign Up
        </Button>
      </View>
      <View
        style={{
          marginTop: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedText>Forgot password?</ThemedText>
        <Button variant="ghost" onPress={() => router.push("/reset-password")}>
          Reset Password
        </Button>
      </View>
    </BodyScrollView>
  );
};

export default SignInScreen;
