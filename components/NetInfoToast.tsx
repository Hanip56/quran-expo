import { View, Text } from "react-native";
import React from "react";
import { Portal } from "react-native-paper";

const NetInfoToast = () => {
  return (
    <Portal>
      <View
        style={[
          {
            backgroundColor: "rgba(0,0,0,.75)",
            position: "absolute",
            bottom: 72,
            width: "60%",
            marginHorizontal: "20%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: 16,
            paddingVertical: 6,
          },
        ]}
      >
        <Text style={{ color: "white" }}>Network not connected</Text>
      </View>
    </Portal>
  );
};

export default NetInfoToast;
