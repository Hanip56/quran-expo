import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Surah } from "@/types/global";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

type PropTypes = {
  surah: Surah;
};

const SurahCard = ({ surah }: PropTypes) => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/reading/${surah.id}`);
  };
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Text style={styles.surahNo}>{surah.id}</Text>
        </View>
        <View style={styles.centerSection}>
          <Text style={styles.surahLatin}>{surah.latin_name}</Text>
          <Text style={styles.surahPlace}>
            {surah.place} - {surah.number_of_ayah} Ayat
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.surahName}>{surah.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SurahCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.gray.extraLight,
    height: 64,
    borderRadius: 4,
    marginBottom: "6%",
  },
  centerSection: {
    flex: 1,
    paddingHorizontal: "4%",
  },
  leftSection: {
    flexBasis: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
  },
  rightSection: {
    flexBasis: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: "7%",
  },
  surahNo: {
    fontSize: 20,
  },
  surahLatin: {
    fontSize: 18,
  },
  surahPlace: {
    fontSize: 12,
    color: "rgba(0,0,0,.7)",
  },
  surahName: {
    fontSize: 24,
  },
});
