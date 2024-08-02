
import {
    Text,
    View,
    StyleSheet,
    Dimensions,


} from 'react-native';


import { useNavigation } from '@react-navigation/native';

import IconButton from '../UI/IconButton';
import * as Progress from 'react-native-progress';
import { Colors } from '@/constants/Colors';


const deviceHeight = Dimensions.get('screen').height
const deviceWidth = Dimensions.get('screen').width


function ProgressBarIcon ({progress, Barwidth}){   

    const navigation = useNavigation();
  
    return (
        <View style={[styles.bottomContainer, { height: deviceHeight * 0.08 }]} >
          <IconButton 
            icon="arrow-left-circle" 
            size={30} 
            color={Colors.purple1}
            onPress={() => navigation.goBack()}/>
          <Progress.Bar
            width={Barwidth}
            height={9}
            progress={progress}
            color={Colors.purple1}
          />
          
        </View>
    
)
}
   

export default ProgressBarIcon;

const styles = StyleSheet.create({

    bottomContainer : {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems : 'center',
        backgroundColor: Colors.black1,
        marginHorizontal : 15,
        marginBottom: 30,
        

    
      }
});









