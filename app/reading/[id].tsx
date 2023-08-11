import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ayah } from "@/types/global";
import { useLocalSearchParams } from "expo-router";
import AyahCard from "@/components/AyahCard";
import { useDbContext } from "@/contexts/dbContext";
import * as FileSystem from "expo-file-system";
import DownloadIndicator from "@/components/DownloadIndicator";
import { Audio, AVPlaybackStatus } from "expo-av";
import NetInfo from "@react-native-community/netinfo";
import NetInfoToast from "@/components/NetInfoToast";
import AudioControl from "@/components/AudioControl";
import ReadingHeader from "@/components/ReadingHeader";

const Reading = () => {
  const [ayahList, setAyahList] = useState<Ayah[]>([]);
  const { db, surahList } = useDbContext();
  const { id } = useLocalSearchParams();
  const [currentAyah, setCurrentAyah] = useState(1);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [audioExists, setAudioExists] = useState(false);
  const [audio, setAudio] = useState<Audio.SoundObject>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [listElements, setListElements] = useState<number[]>([]);
  const [showNetInfo, setShowNetInfo] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [downloadAC, setDownloadAC] = useState<AbortController>(
    new AbortController()
  );

  const currentSurah = surahList[parseInt(id.toString()) - 1];
  const name = currentSurah.latin_name;
  const number_of_ayah = currentSurah.number_of_ayah;

  const scrollRef = useRef<ScrollView>(null);
  const downloadResumables = useRef<FileSystem.DownloadResumable[]>([]);

  const downloadAudio = async () => {
    if (
      !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + `audio`))
        .exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + `audio`
      );
    }
    if (
      !(
        await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + `audio/${id}`
        )
      ).exists
    ) {
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + `audio/${id}`
      );
    }

    const downloadResumable = (ayahId: number, ayahAudioIndex: number) =>
      FileSystem.createDownloadResumable(
        `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahAudioIndex}.mp3`,
        FileSystem.documentDirectory + `audio/${id}/${ayahId}.mp3`
      );
    // async function downloadAllAudioSurah() {
    //   await Promise.all(
    //     ayahList.map((ayah) =>
    //       downloadResumable(ayah.ayahId, ayah.id + 1).downloadAsync()
    //     )
    //   );
    // }
    async function downloadAllAudioSurah() {
      try {
        await Promise.all(
          ayahList.map(async (ayah) => {
            const resumable = downloadResumable(ayah.ayahId, ayah.id + 1);
            downloadResumables.current.push(resumable);
            await resumable.downloadAsync();
          })
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      setDownloadLoading(true);
      await downloadAllAudioSurah();
      setDownloadLoading(false);
      if (
        (
          await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + `audio/${id}/${number_of_ayah}.mp3`
          )
        ).exists
      ) {
        console.log("Download Finished");
        setAudioExists(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateStatusAudio = async (data: AVPlaybackStatus) => {
    if (data.isLoaded) {
      if (data.didJustFinish) {
        if (currentAyah !== number_of_ayah) {
          setCurrentAyah((prev) => prev + 1);
        } else {
          setIsPlaying(false);
          setIsPlayed(false);
          setCurrentAyah(1);
          await audio?.sound.unloadAsync();
        }
      }
    }
  };

  console.log({ audioExists });

  const playAudio = async (ayah: number) => {
    try {
      console.log(
        FileSystem.documentDirectory + "audio/" + `${id}/${ayah}.mp3`
      );
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: FileSystem.documentDirectory + "audio/" + `${id}/${ayah}.mp3`,
        },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      if (!isPlayed) {
        setIsPlayed(true);
      }

      setAudio({ sound, status });
      if (status.isLoaded) {
        sound.setOnPlaybackStatusUpdate(updateStatusAudio);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pauseAudio = async () => {
    try {
      if (audio?.status.isLoaded) {
        if (audio.status.isPlaying) {
          audio.sound.pauseAsync();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStop = async () => {
    setCurrentAyah(1);
    setIsPlayed(false);
    setIsPlaying(false);
    await audio?.sound.unloadAsync();
  };

  const handlePlay = async () => {
    if (audioExists) {
      await playAudio(currentAyah);
    } else {
      const state = await NetInfo.fetch();
      if (state.isConnected) {
        await downloadAudio();
      } else {
        setShowNetInfo(true);
      }
    }
  };

  // hide NetInfo after 1 second
  useEffect(() => {
    const NetTimeOut = setTimeout(() => {
      setShowNetInfo(false);
    }, 1000);

    return () => {
      clearTimeout(NetTimeOut);
    };
  }, [showNetInfo]);

  // switch ayah when one is done
  useEffect(() => {
    handleScroll(currentAyah - 1);
    if (isPlaying) {
      audio?.sound.unloadAsync();
      playAudio(currentAyah);
    }
  }, [currentAyah]);

  // turn off audio when leave screen
  useEffect(() => {
    return audio?.sound
      ? () => {
          audio.sound.unloadAsync();
        }
      : undefined;
  }, [audio?.sound]);

  // initial
  useEffect(() => {
    // check audio exist
    const checkAudioExist = async () => {
      if (
        (
          await FileSystem.getInfoAsync(
            FileSystem.documentDirectory + `audio/${id}/${number_of_ayah}.mp3`
          )
        ).exists
      ) {
        setAudioExists(true);
      }
    };

    // fetch list of ayahs
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
    checkAudioExist();
  }, []);

  const handleScroll = (index: number, animated = false) => {
    if (scrollRef.current) {
      let yOffset = listElements[index];
      scrollRef.current?.scrollTo({ x: 0, y: yOffset, animated: animated });
    }
  };

  const elementsRef: number[] = [];

  if (ayahList.length < 1) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <ReadingHeader
        number_of_ayah={number_of_ayah}
        setCurrentAyah={setCurrentAyah}
      />
      <View style={styles.container}>
        {/* Network Indicator */}
        {showNetInfo && <NetInfoToast />}
        {/* download indicator */}
        <DownloadIndicator
          isLoading={downloadLoading}
          hide={() => setDownloadLoading(false)}
          downloadResumables={downloadResumables}
          setAudioExists={setAudioExists}
        />
        <TouchableOpacity
          style={styles.titleLabel}
          onPress={() => setShowNetInfo(true)}
        >
          <Text style={styles.title}>{name}</Text>
        </TouchableOpacity>
        <ScrollView ref={scrollRef}>
          {ayahList?.map((ayah) => (
            <AyahCard
              key={ayah.id}
              ayah={ayah}
              numberOfAyah={number_of_ayah}
              currentAyah={currentAyah}
              setCurrentAyah={setCurrentAyah}
              elementsRef={elementsRef}
              setListElements={setListElements}
            />
          ))}
        </ScrollView>
        <AudioControl
          audioExists={audioExists}
          currentAyah={currentAyah}
          handlePlay={handlePlay}
          handleStop={handleStop}
          isPlayed={isPlayed}
          isPlaying={isPlaying}
          number_of_ayah={number_of_ayah}
          pauseAudio={pauseAudio}
          setCurrentAyah={setCurrentAyah}
        />
      </View>
    </>
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
});

export default Reading;
