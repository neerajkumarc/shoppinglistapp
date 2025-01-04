import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/bodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const SignUpScreen = () => {
  const { isLoaded, setActive, signUp } = useSignUp();

  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [isVerificationPending, setIsVerificationPending] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerificationPending(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setIsLoading(true);
    setErrors([]);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(index)");
      } else {
        console.log(signUpAttempt);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerificationPending) {
    return (
      <BodyScrollView style={{ paddingHorizontal: 16, marginTop: 16 }}>
        <TextInput
          label={`Enter the verification code sent to ${emailAddress} `}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          value={code}
        />
        <Button
          onPress={onVerifyPress}
          disabled={!code || isLoading}
          loading={isLoading}
        >
          Verify
        </Button>
        {errors.map((error, index) => (
          <ThemedText style={{ color: "red" }} key={index}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
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
        onPress={onSignUpPress}
        disabled={!emailAddress || !password || isLoading}
        loading={isLoading}
      >
        Sign Up
      </Button>

      <View
        style={{
          marginTop: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedText>Already have an account?</ThemedText>
        <Button variant="ghost" onPress={() => router.push("/")}>
          Sign In
        </Button>
      </View>
    </BodyScrollView>
  );
};

export default SignUpScreen;
