import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ayah } from "@/types/global";
import { useLocalSearchParams } from "expo-router";
import AyahCard from "@/components/AyahCard";
import { useDbContext } from "@/contexts/dbContext";
import { StatusBar } from "expo-status-bar";

const Reading = () => {
  const [ayahList, setAyahList] = useState<Ayah[]>([]);
  const { db, surahList } = useDbContext();
  const { id } = useLocalSearchParams();

  const currentSurah = surahList[parseInt(id.toString()) - 1];
  const name = currentSurah.latin_name;
  const number_of_ayah = currentSurah.number_of_ayah;

  useEffect(() => {
    db?.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM ayah_list WHERE surahId = ?",
        [id as string],
        (_, resultSet) => setAyahList(resultSet.rows._array),
        (_, error) => {
          console.log(error);
          return true;
        }
      );
    });
  }, []);

  if (ayahList.length < 1) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleLabel}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <ScrollView>
        {ayahList?.map((ayah) => (
          <AyahCard key={ayah.id} ayah={ayah} numberOfAyah={number_of_ayah} />
        ))}
      </ScrollView>
      <View style={styles.controls}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="skip-backward"
            size={45}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="play" size={45} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="stop" size={45} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="skip-forward" size={45} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleLabel: {
    width: "100%",
    position: "absolute",
    zIndex: 10,
    top: 0,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30,164,137,.4)",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  controls: {
    height: 55,
    backgroundColor: "rgba(0,0,0,.75)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Reading;