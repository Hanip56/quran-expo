import Colors from "@/constants/Colors";
import * as React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { ActivityIndicator, Modal, Portal, Text } from "react-native-paper";
import * as FileSystem from "expo-file-system";

type PropType = {
  isLoading: boolean;
  hide: () => void;
  downloadResumables: React.MutableRefObject<FileSystem.DownloadResumable[]>;
  setAudioExists: React.Dispatch<React.SetStateAction<boolean>>;
};

const DownloadIndicator = ({
  isLoading,
  hide,
  downloadResumables,
  setAudioExists,
}: PropType) => {
  const cancelAllDownloads = () => {
    downloadResumables.current.forEach((resumable) => {
      resumable.cancelAsync();
    });
  };
  const handleBatal = () => {
    setAudioExists(false);
    hide();
    cancelAllDownloads();
  };

  React.useEffect(() => {
    return () => {
      handleBatal();
    };
  }, []);

  return (
    <Portal>
      <Modal
        style={styles.overlay}
        visible={isLoading}
        onDismiss={hide}
        contentContainerStyle={styles.container}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>Downloading...</Text>
          <ActivityIndicator
            size="large"
            animating={true}
            color={Colors.green.light}
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
        </View>
      </Modal>
    </Portal>
  );
};

export default DownloadIndicator;

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
    backgroundColor: Colors.green.light,
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
    gap: 16,
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
    color: Colors.green.light,
  },
});
