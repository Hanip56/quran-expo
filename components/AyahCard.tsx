import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  LayoutRectangle,
} from "react-native";
import React from "react";
import { Ayah } from "@/types/global";

type PropTypes = {
  ayah: Ayah;
  numberOfAyah: number;
  currentAyah: number;
  setCurrentAyah: React.Dispatch<React.SetStateAction<number>>;
  elementsRef: number[];
  setListElements: React.Dispatch<React.SetStateAction<number[]>>;
};

const AyahCard = ({
  ayah,
  numberOfAyah,
  currentAyah,
  setCurrentAyah,
  elementsRef,
  setListElements,
}: PropTypes) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 40,
      paddingHorizontal: "6%",
      gap: 8,
      backgroundColor:
        ayah.ayahId == currentAyah ? "rgba(8,255,201,.05)" : "white",
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
    setCurrentAyah(ayah.ayahId);
  };

  return (
    <TouchableHighlight
      underlayColor={"rgba(0,0,0,.1)"}
      onPress={handlePress}
      style={styles.container}
      onLayout={(e) => {
        const layout = e.nativeEvent.layout;
        if (layout) {
          elementsRef[ayah.ayahId - 1] = layout.y - 42; // 42 here is title label height eg. Al-fatihah
          if (ayah.ayahId === numberOfAyah) {
            setListElements(elementsRef);
          }
        }
      }}
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
