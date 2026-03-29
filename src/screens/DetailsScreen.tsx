import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { getCharacterById } from "../api/dbzApi";
import { Character } from "../types/character";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

type Props = {
  route: RouteProp<RootStackParamList, "Details">;
};

export default function DetailsScreen({ route }: Props) {
  const { id } = route.params;
  const [char, setChar] = useState<Character | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getCharacterById(id);
    setChar(res);
  };

  if (!char) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: char.image }} style={styles.image} />
      <Text style={styles.name}>{char.name}</Text>
      <Text style={styles.text}>{char.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f172a" },
  image: { width: 200, height: 250, alignSelf: "center" },
  name: { fontSize: 24, color: "#fff", textAlign: "center" },
  text: { color: "#ccc", marginTop: 10 },
});
