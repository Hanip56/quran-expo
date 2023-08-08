import { StyleSheet, View, TouchableHighlight } from "react-native";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputAyah from "./InputAyah";

type PropType = {
  number_of_ayah: number;
  setCurrentAyah: React.Dispatch<React.SetStateAction<number>>;
};

export default function ReadingHeader({
  number_of_ayah,
  setCurrentAyah,
}: PropType) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <View
      style={{
        backgroundColor: Colors.green.normal,
        paddingTop: 24,
        paddingHorizontal: 8,
        height: 80,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableHighlight
        style={{
          padding: 4,
          borderRadius: 32,
        }}
        underlayColor="rgba(255,255,255,.1)"
        onPress={handleBack}
      >
        <MaterialCommunityIcons name="chevron-left" size={32} color="white" />
      </TouchableHighlight>
      <InputAyah
        number_of_ayah={number_of_ayah}
        setCurrentAyah={setCurrentAyah}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
  },
});
