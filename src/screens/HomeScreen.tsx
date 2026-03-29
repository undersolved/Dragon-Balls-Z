import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Dimensions,
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

const { width } = Dimensions.get("window");

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search character..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            onChangeText={debouncedSearch}
          />
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item }) => (
            <CharacterCard
              item={item}
              onPress={() => navigation.navigate("Details", { id: item.id })}
            />
          )}
          onEndReached={() => {
            if (!query && nextUrl) loadCharacters(nextUrl);
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#3b82f6" /> : null
          }
          contentContainerStyle={styles.listContent}
          scrollIndicatorInsets={{ right: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});
