import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { SetStateAction } from "react";
import { Ayah } from "@/types/global";

type PropTypes = {
  ayah: Ayah;
  numberOfAyah: number;
  currentAyah: number;
  setCurrentAyah: React.Dispatch<React.SetStateAction<number>>;
};

const AyahCard = ({
  ayah,
  numberOfAyah,
  currentAyah,
  setCurrentAyah,
}: PropTypes) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 40,
      paddingHorizontal: "6%",
      gap: 8,
      backgroundColor:
        ayah.ayahId == currentAyah + 1 ? "rgba(8,255,201,.05)" : "white",
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

  const handlePress = () => {
    setCurrentAyah(ayah.ayahId - 1);
  };

  return (
    <TouchableHighlight
      underlayColor={"rgba(0,0,0,.1)"}
      onPress={handlePress}
      style={styles.container}
    >
      <View>
        <Text style={styles.ayahText}>{ayah.ayahText}</Text>
        <Text
          style={styles.ayahReadText}
        >{`${ayah.ayahId}. ${ayah.readText}`}</Text>
        <Text
          style={styles.indoText}
        >{`${ayah.ayahId}. ${ayah.indoText}`}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default AyahCard;
