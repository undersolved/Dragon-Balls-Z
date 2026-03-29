import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import "react-native-gesture-handler";

import DetailsScreen from "./src/screens/DetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CustomSplashScreen from "./src/screens/SplashScreen";

export type RootStackParamList = {
  Tabs: undefined;
  Details: { id: number };
};

type TabsParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabsParamList>();

SplashScreen.preventAutoHideAsync();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0f172a",
          borderBottomWidth: 1,
          borderBottomColor: "#1e293b",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopColor: "#1e293b",
          borderTopWidth: 1,
          paddingBottom: 5,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home" size={size} color={color} />;
          }
          return <Ionicons name="home" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Characters" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  const handleSplashFinish = () => {
    setReady(true);
  };

  if (!ready) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f172a",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Character Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
