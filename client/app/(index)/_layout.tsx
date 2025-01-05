import Button from "@/components/ui/button";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import React from "react";

const HomeRoutesLayout = () => {
  const router = useRouter();
  const { user } = useUser();
  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Shopping List" }} />
      <Stack.Screen
        name="list/new/index"
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.75, 1],
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="list/new/scan"
        options={{
          presentation: "fullScreenModal",
          headerLargeTitle: false,
          headerTitle: "Scan QR Code",
          headerLeft: () => {
            return (
              <Button variant="ghost" onPress={() => router.back()}>
                Cancel
              </Button>
            );
          },
        }}
      />
      <Stack.Screen
        name="list/new/create"
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HomeRoutesLayout;
