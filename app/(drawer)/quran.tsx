import { StyleSheet, View, ScrollView } from "react-native";
import Colors from "@/constants/Colors";
import SurahCard from "@/components/SurahCard";
import { useDbContext } from "@/contexts/dbContext";

export default function QuranScreen() {
  const { surahList } = useDbContext();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentStyle}>
        {surahList.map((surah) => (
          <SurahCard key={surah.id} surah={surah} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray.light,
  },
  contentStyle: {
    paddingVertical: "3%",
    paddingHorizontal: "3%",
  },
});
