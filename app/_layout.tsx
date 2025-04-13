import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Redirect, router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // if (true) {
    //   router.replace("/(autheticated)/(tabs)/home");
    // }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="signup"
                options={{
                  title: "",
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: Colors.background,
                  },
                }}
              />
              <Stack.Screen
                name="login"
                options={{
                  title: "",
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: Colors.background,
                  },
                  headerRight: () => (
                    <Link href={"/help"} asChild>
                      <TouchableOpacity>
                        <Ionicons
                          name="help-circle-outline"
                          size={34}
                          color={Colors.dark}
                        />
                      </TouchableOpacity>
                    </Link>
                  ),
                }}
              />
              <Stack.Screen
                name="help"
                options={{
                  title: "Help",
                  presentation: "modal",
                }}
              />

              <Stack.Screen
                name="(autheticated)/(tabs)"
                options={{ headerShown: false }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
