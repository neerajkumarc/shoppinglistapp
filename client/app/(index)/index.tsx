import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/bodyScrollView";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  const { signOut } = useClerk();
  return (
    <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
      <ThemedText>Home In</ThemedText>
      <Button onPress={signOut}>Sign Out</Button>
    </BodyScrollView>
  );
};

export default HomeScreen;
