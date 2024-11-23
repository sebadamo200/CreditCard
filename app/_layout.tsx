import { Stack,  Link  } from "expo-router";
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
    screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="(home)" />
    </Stack>
  )
}
