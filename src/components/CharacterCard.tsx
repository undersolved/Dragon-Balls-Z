import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Character } from "../types/character";

interface Props {
  item: Character;
  onPress: () => void;
}

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // Account for padding

export default function CharacterCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, { width: cardWidth }]}
      activeOpacity={0.8}
    >
      <BlurView intensity={80} tint="dark" style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          defaultSource={require("../../assets/images/icon.png")}
        />
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.info} numberOfLines={1}>
          {item.race}
        </Text>
        <Text style={styles.ki} numberOfLines={1}>
          Ki: {item.ki}
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
  card: {
    padding: 12,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.1)",
  },
  image: {
    width: 100,
    height: 130,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
  },
  info: {
    color: "#cbd5e1",
    fontSize: 12,
    marginBottom: 4,
    textAlign: "center",
  },
  ki: {
    color: "#94a3b8",
    fontSize: 11,
    textAlign: "center",
    fontWeight: "500",
  },
});
