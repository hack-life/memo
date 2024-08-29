import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

function ArticleBox({ title, url }) {
  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]} 
      onPress={() => navigation.navigate("Read")}
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
    flexDirection: 'row',
    alignItems: 'center',
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
