import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Pressable, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import CustomTopTab from "@/components/CustomTopTab";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer
      // drawerContent={() => (
      //   <View>
      //     <Text>Hello</Text>
      //   </View>
      // )}
      screenOptions={{
        swipeEnabled: true,
        headerShown: true,
        header: (props) => <CustomTopTab headerProps={props} />,
        drawerStyle: { backgroundColor: Colors.primary.semidark },
        drawerItemStyle: {
          backgroundColor: Colors.primary.dark,
          borderRadius: 0,
        },
        drawerLabelStyle: { color: "white" },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Beranda",
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="quran"
        options={{
          title: "Al-Quran",
          headerLeft: () => null,
        }}
      />
    </Drawer>
  );
}
