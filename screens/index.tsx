import { View, StyleSheet} from 'react-native';
import { Colors } from '@/constants/Colors';
import Carousel from '@/components/memoMVP/carousel/carousel';
// import { useNavigation } from '@react-navigation/native';
import {useContext} from 'react';

import IconButton from '@/components/memoMVP/UI/IconButton';
import { AuthContext } from '@/store/auth-context';


export default function HomeScreen() {
  
  // const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  return (
    <View style = {styles.wraper}>
      <View style= {styles.carouselOuter}>
        <View style= {styles.carouselInner} >
          <Carousel />
        </View>
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
    backgroundColor: Colors.black1
  },
  
  carouselOuter: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.black1,
  },

  carouselInner: {
    backgroundColor: Colors.black1,
  },

  bottomContainer : {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems : 'center',
    margin:5,
    padding:5,

  },
  
})