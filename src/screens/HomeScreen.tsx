import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from "react-native";
import debounce from "lodash.debounce";

import { getCharacters, searchCharacters } from "../api/dbzApi";
import { Character } from "../types/character";
import CharacterCard from "../components/CharacterCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function HomeScreen({ navigation }: Props) {
  const [data, setData] = useState<Character[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async (url?: string) => {
    const res = await getCharacters(url);
    setData((prev) => [...prev, ...res.items]);
    setNextUrl(res.links?.next || null);
    setLoading(false);
  };

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (!text) {
      setData([]);
      loadCharacters();
      return;
    }
    const res = await searchCharacters(text);
    setData(res);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search character..."
        placeholderTextColor="#aaa"
        style={styles.input}
        onChangeText={debouncedSearch}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            item={item}
            onPress={() => navigation.navigate("Details", { id: item.id })}
          />
        )}
        onEndReached={() => {
          if (!query && nextUrl) loadCharacters(nextUrl);
        }}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  input: {
    margin: 10,
    padding: 12,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
  },
});
