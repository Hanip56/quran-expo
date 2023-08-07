import { StyleSheet, View, TouchableHighlight } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputAyah from "./InputAyah";

export default function ReadingHeader(props: NativeStackHeaderProps) {
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
      <InputAyah />
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
