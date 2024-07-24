import { Text, View, StyleSheet, Pressable, Image} from 'react-native';
import { Colors } from '@/constants/Colors';
import Carousel from '@/components/memoMVP/carousel/carousel';



export default function HomeScreen() {
  return (
    <View style= {styles.carouselOuter}>
      
      <Pressable onPress={() => navigation.navigate('Read')}>
        <View style= {styles.carouselInner} >

          <Image source={require('../assets/images/react-logo.png')} />
          <Text>Title Test</Text>
          <Carousel />
        </View>


      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
    backgroundColor: Colors.white1,
    marginTop: 40,
  },
  carouselOuter: {
    flex:1,
    flexDirection: "column",
    
    alignItems: "center",
    backgroundColor: Colors.grey2,
  },

  
})