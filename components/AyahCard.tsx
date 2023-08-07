import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ayah } from "@/types/global";

type PropTypes = {
  ayah: Ayah;
  numberOfAyah: number;
};

const AyahCard = ({ ayah, numberOfAyah }: PropTypes) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 40,
      paddingHorizontal: "6%",
      gap: 8,
      backgroundColor: ayah.ayahId == 1 ? "rgba(8,255,201,.1)" : "white",
      marginTop: ayah.ayahId == 1 ? 42 : 0,
      marginBottom: ayah.ayahId == numberOfAyah ? 50 : 0,
    },
    ayahText: {
      fontSize: 20,
      lineHeight: 32,
      marginBottom: 16,
    },
    ayahReadText: {},
    indoText: {
      lineHeight: 18,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.ayahText}>{ayah.ayahText}</Text>
      <Text
        style={styles.ayahReadText}
      >{`${ayah.ayahId}. ${ayah.readText}`}</Text>
      <Text style={styles.indoText}>{`${ayah.ayahId}. ${ayah.indoText}`}</Text>
    </View>
  );
};

export default AyahCard;
