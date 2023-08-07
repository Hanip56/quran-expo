import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import Colors from "@/constants/Colors";
import { useTabContext } from "@/contexts/TabProvider";
import { useRouter } from "expo-router";

type PropTypes = {
  headerProps: DrawerHeaderProps;
};

const tabs = ["beranda", "al-quran"];

const CustomTopTab = ({ headerProps }: PropTypes) => {
  const { tab: tabState } = useTabContext();
  const router = useRouter();

  const handleNavigate = (route: string) => {
    if (route === "beranda") {
      router.push("/(drawer)/");
    } else if (route === "al-quran") {
      router.push("/(drawer)/quran");
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, idx) => (
        <TouchableHighlight
          key={idx}
          style={[
            styles.tab,
            {
              backgroundColor:
                tabState === tab ? Colors.green.dark : Colors.green.light,
            },
          ]}
          underlayColor={Colors.green.semiDark}
          onPress={() => handleNavigate(tab)}
        >
          <Text style={styles.tabText}>{tab}</Text>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default CustomTopTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  tabText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    textTransform: "capitalize",
  },
});
