import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router/src/useNavigation";
import { DrawerActions } from "@react-navigation/native";
import TabProvider from "@/contexts/TabProvider";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { dbContext } from "@/contexts/dbContext";
import { Surah } from "@/types/global";
import ReadingHeader from "@/components/ReadingHeader";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-native-paper";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [surahList, setsurahList] = useState<Surah[]>([]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  const connectDB = async () => {
    const directory = FileSystem.documentDirectory + "SQLite";
    const dbName = "quran_idn.db";

    if (!(await FileSystem.getInfoAsync(directory)).exists) {
      await FileSystem.makeDirectoryAsync(directory);
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../assets/db/quran_idn.db")).uri,
      directory + "/" + dbName
    );
    const db = SQLite.openDatabase(dbName);
    setDb(db);
    db?.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM surah_list",
        [],
        (_, resultSet) => setsurahList(resultSet.rows._array),
        (_, error) => {
          console.log(error);
          return true;
        }
      );
    });
    setIsLoading(false);
  };

  // db
  useEffect(() => {
    connectDB();
  }, []);

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded && isLoading) {
    return null;
  }

  return (
    <dbContext.Provider value={{ db, surahList }}>
      <RootLayoutNav />
    </dbContext.Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <TabProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider>
          <StatusBar backgroundColor="black" style="light" />
          <Stack>
            <Stack.Screen
              name="(drawer)"
              options={{
                headerShown: true,
                headerLeft: (props) => (
                  <TouchableOpacity
                    style={{ paddingRight: 16 }}
                    onPress={handlePress}
                  >
                    <MaterialCommunityIcons
                      name="menu"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="reading/[id]"
              options={{
                animation: "fade_from_bottom",
                header: (props) => <ReadingHeader {...props} />,
              }}
            />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
              }}
            />
          </Stack>
        </Provider>
      </ThemeProvider>
    </TabProvider>
  );
}
