import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/bodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const SignInScreen = () => {
  const { isLoaded, setActive, signIn } = useSignIn();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);
  const onSignInPress = async () => {
    if (!isLoaded) return;
    setIsSigningIn(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

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

      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}

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
