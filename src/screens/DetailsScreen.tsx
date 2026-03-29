import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import { getCharacterById } from "../api/dbzApi";
import { translateSmartly } from "../services/translationService";
import { Character } from "../types/character";

type Props = {
  route: RouteProp<RootStackParamList, "Details">;
};

const { width } = Dimensions.get("window");

export default function DetailsScreen({ route }: Props) {
  const { id } = route.params;
  const [char, setChar] = useState<Character | null>(null);
  const [translatedDescription, setTranslatedDescription] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    load();
  }, [id]);

  const load = async () => {
    try {
      const res = await getCharacterById(id);
      setChar(res);
      setTranslatedDescription(res.description);
      setIsTranslated(false);
    } catch (error) {
      console.error("Error loading character:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!char || translating) return;

    if (isTranslated) {
      // Toggle back to original
      setTranslatedDescription(char.description);
      setIsTranslated(false);
      return;
    }

    setTranslating(true);
    try {
      console.log("Translating description...");
      const translated = await translateSmartly(char.description);
      setTranslatedDescription(translated);
      setIsTranslated(true);
      console.log("Translation complete");
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again.");
    } finally {
      setTranslating(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </SafeAreaView>
    );
  }

  if (!char) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <Text style={styles.errorText}>Character not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: char.image }} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.name}>{char.name}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Race</Text>
              <Text style={styles.statValue}>{char.race}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Gender</Text>
              <Text style={styles.statValue}>{char.gender}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Ki</Text>
              <Text style={styles.statValue}>{char.ki}</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionTitle}>
                {isTranslated
                  ? "📝 Description (English)"
                  : "📝 Description (Spanish)"}
              </Text>
              <TouchableOpacity
                style={[
                  styles.translateBtn,
                  translating && styles.translateBtnDisabled,
                ]}
                onPress={handleTranslate}
                disabled={translating}
              >
                {translating ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons
                      name="language"
                      size={16}
                      color="#fff"
                      style={{ marginRight: 6 }}
                    />
                    <Text style={styles.translateBtnText}>
                      {isTranslated ? "Original" : "Translate"}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{translatedDescription}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  image: {
    width: 200,
    height: 280,
    resizeMode: "contain",
    borderRadius: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "700",
  },
  descriptionContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.6)",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.1)",
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  translateBtn: {
    flexDirection: "row",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  translateBtnDisabled: {
    opacity: 0.6,
  },
  translateBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 22,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
  },
});
