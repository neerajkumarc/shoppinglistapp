import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/bodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue } from "@/constants/Colors";
import { useClerk } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

const HomeScreen = () => {
  const { signOut } = useClerk();

  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/(index)/list/new")}>
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    );
  };
  const headerLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={appleBlue} />
      </Pressable>
    );
  };
  return (
    <>
      <Stack.Screen
        options={{ headerRight: renderHeaderRight, headerLeft: headerLeft }}
      />
      <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <ThemedText>Home In</ThemedText>
        <Button onPress={signOut}>Sign Out</Button>
      </BodyScrollView>
    </>
  );
};

export default HomeScreen;
