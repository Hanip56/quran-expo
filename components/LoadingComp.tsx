import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const LoadingComp = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        animating={true}
        color={Colors.primary.light}
      />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
