import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type PropType = {
  currentAyah: number;
  number_of_ayah: number;
  isPlayed: boolean;
  audioExists: boolean;
  isPlaying: boolean;
  setCurrentAyah: React.Dispatch<React.SetStateAction<number>>;
  pauseAudio: () => void;
  handlePlay: () => void;
  handleStop: () => void;
};

const AudioControl = ({
  currentAyah,
  setCurrentAyah,
  isPlayed,
  audioExists,
  pauseAudio,
  isPlaying,
  handlePlay,
  handleStop,
  number_of_ayah,
}: PropType) => {
  return (
    <View style={styles.controls}>
      <TouchableOpacity
        style={styles.btnControls}
        disabled={currentAyah === 1 || !isPlayed}
        onPress={() => setCurrentAyah((prev) => prev - 1)}
      >
        <MaterialCommunityIcons
          name="skip-backward"
          size={45}
          color={
            !audioExists || currentAyah == 1 || !isPlayed ? "gray" : "white"
          }
        />
      </TouchableOpacity>
      {isPlaying ? (
        <TouchableOpacity style={styles.btnControls} onPress={pauseAudio}>
          <MaterialCommunityIcons name="pause" size={45} color={"white"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handlePlay}>
          <MaterialCommunityIcons name="play" size={45} color={"white"} />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.btnControls}>
        <MaterialCommunityIcons
          onPress={handleStop}
          name="stop"
          size={45}
          color={!audioExists || !isPlayed ? "gray" : "white"}
          disabled={!audioExists || !isPlayed}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnControls}
        disabled={currentAyah == number_of_ayah || !isPlayed}
        onPress={() => setCurrentAyah((prev) => prev + 1)}
      >
        <MaterialCommunityIcons
          name="skip-forward"
          size={45}
          color={
            !audioExists || currentAyah === number_of_ayah || !isPlayed
              ? "gray"
              : "white"
          }
          disabled={!audioExists}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AudioControl;

const styles = StyleSheet.create({
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
  btnControls: {
    paddingHorizontal: 2,
  },
});
