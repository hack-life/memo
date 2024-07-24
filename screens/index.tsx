import { Text, View, StyleSheet} from 'react-native';
import { Colors } from '@/constants/Colors';


export default function HomeScreen() {
  return (
    <View style= {styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    backgroundColor: Colors.white1,
    marginTop: 40,
    backgroundColor : Colors.black1,
  }
  
})