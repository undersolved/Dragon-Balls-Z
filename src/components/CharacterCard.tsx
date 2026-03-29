import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Character } from "../types/character";

interface Props {
  item: Character;
  onPress: () => void;
}

export default function CharacterCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <BlurView intensity={50} tint="dark" style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>
          {item.race} • Ki: {item.ki}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { margin: 10 },
  card: {
    padding: 15,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  image: { width: 120, height: 150 },
  name: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  info: { color: "#ccc" },
});
