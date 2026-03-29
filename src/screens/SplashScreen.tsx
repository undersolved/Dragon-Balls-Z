import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface Props {
  onFinish: () => void;
}

export default function CustomSplashScreen({ onFinish }: Props) {
  const opacity = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        SplashScreen.hideAsync();
        onFinish();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.dragonBall}>🐉</Text>
      <Text style={styles.title}>Dragon Ball Z</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  dragonBall: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
  },
});
