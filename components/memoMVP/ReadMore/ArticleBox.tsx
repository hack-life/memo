import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";

type RootStackParamList = {
  Read: { title: string; content: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Read'>;

function ArticleBox({ title, url, content }: { title: string; url: string; content: string }) {
  const [fontsLoaded] = useFonts({
    "Serif-Italic": require("@/assets/fonts/DMSerifText-Italic.ttf"),
    Serif: require("@/assets/fonts/DMSerifText-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null; // or some loading indicator
  }

  const navigation = useNavigation<NavigationProp>();
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => navigation.navigate("Read", { title, content })}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.source}>{url}</Text>
      </View>

      <View style={styles.icon}>
        <FontAwesome5 name="chevron-right" size={40} color="black" />
      </View>
    </Pressable>
  );
}

export default ArticleBox;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 7,
    backgroundColor: Colors.grey1,
  },
  pressed: {
    opacity: 0.7,
  },

  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    marginLeft: 15,
    fontSize: 18,
    color: Colors.white1,
    fontWeight: "bold",
    fontFamily: "Serif",

  },

  source: {
    marginLeft: 15,
    fontSize: 18,
    color: Colors.white1,
  },

  icon: {
    marginRight: 15,
  },
});
