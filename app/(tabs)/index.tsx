import { Text, View, StyleSheet} from 'react-native';


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
    backgroundColor: "white",
    marginTop: 40,
  }
  
})