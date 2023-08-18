import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { Modal, Portal, Text, TextInput } from "react-native-paper";

type PropType = {
  number_of_ayah: number;
  setCurrentAyah: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

const InputAyah = ({ number_of_ayah, setCurrentAyah, isLoading }: PropType) => {
  const [visible, setVisible] = React.useState(false);
  const [noAyah, setNoAyah] = React.useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleInput = (text: string) => {
    if (/^$|^\d+$/g.test(text)) {
      setNoAyah(text);
    }
  };

  const handleBatal = () => {
    hideModal();
  };
  const handleSubmit = () => {
    const target = parseInt(noAyah);
    if (target < 1) {
      setCurrentAyah(1);
    } else if (target > number_of_ayah) {
      setCurrentAyah(number_of_ayah);
    } else {
      setCurrentAyah(target);
    }
    hideModal();
    setNoAyah("");
  };

  return (
    <View>
      <Portal>
        <Modal
          style={styles.overlay}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.container}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Menuju ke Ayat</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>
              Masukan nomor ayat diantara 1 - {number_of_ayah}
            </Text>
            <TextInput
              style={styles.contentTextInput}
              value={noAyah}
              onChangeText={handleInput}
              onSubmitEditing={handleSubmit}
              autoFocus
              activeUnderlineColor="black"
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              underlayColor={Colors.gray.light}
              onPress={handleBatal}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>Batal</Text>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={Colors.gray.light}
              onPress={handleSubmit}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>OK</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </Portal>
      <TouchableHighlight
        underlayColor="rgba(255,255,255,.1)"
        onPress={showModal}
        style={styles.button}
        disabled={isLoading}
      >
        <MaterialCommunityIcons
          name="arrow-u-left-bottom-bold"
          size={24}
          color="white"
        />
      </TouchableHighlight>
    </View>
  );
};

export default InputAyah;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.4)",
  },
  button: { padding: 6, borderRadius: 24, marginHorizontal: 4 },
  titleContainer: {
    backgroundColor: Colors.primary.light,
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    gap: 5,
  },
  contentText: {},
  contentTextInput: {
    backgroundColor: "transparent",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.1)",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary.light,
  },
});
