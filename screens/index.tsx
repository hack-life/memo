import { Text, View, StyleSheet, Pressable, Image} from 'react-native';
import { Colors } from '@/constants/Colors';
import Carousel from '@/components/memoMVP/carousel/carousel';
import { useNavigation } from '@react-navigation/native';
import {useContext} from 'react';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '@/components/memoMVP/UI/IconButton';
import AuthContextProvider, { AuthContext } from '@/store/auth-context';


export default function HomeScreen() {
  
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  return (
    <View style = {styles.wraper}>
      
      <View style= {styles.carouselOuter}>
        
        <Pressable onPress={() => navigation.navigate('Read')}>
          <View style= {styles.carouselInner} >

            <Image source={require('../assets/images/react-logo.png')} />
            <Text>Title Test</Text>
            <Carousel />

          </View>


        </Pressable>


      </View>



      <View style={styles.bottomContainer}>
        <IconButton icon='logout' size={24} color={Colors.purple1} onPress={authCtx.logout}/>
      </View>


  </View>  
  );
}

const styles = StyleSheet.create({
  wraper : {
    flex:1,
  },
  
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

  bottomContainer : {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems : 'center',
    margin:5,
    padding:5,

  },
  
})